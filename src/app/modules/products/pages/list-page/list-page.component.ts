import { Component, inject, signal } from '@angular/core';
import { InputSearchDebouncedComponent } from '../../components/input-search-debounced/input-search-debounced.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { Product } from '../../interfaces/entities/Product';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    InputSearchDebouncedComponent,
    ButtonComponent,
    DropdownMenuComponent,
    DialogComponent,
    SkeletonComponent
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

  private productsService = inject(ProductsService);
  private router = inject(Router);


  public listProducts = signal<Product[]>([]);
  public displayedProducts = signal<Product[]>([]);
  public itemsPerPage = signal(5);
  public visible = signal(false);
  public messageDelete = signal('');
  public productSelected = signal<Product | null>(null);
  public isLoading = signal(true);

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productsService.get().subscribe({
      next: (res) => {
        this.listProducts.set(res);
        this.updateDisplayedProducts();
        this.isLoading.set(false);
      }
    })
  }

  public searchDebounced(value: string) {
    if (value === '') {
      this.getProducts();
      return;
    }

    this.displayedProducts.set(this.displayedProducts().filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, this.itemsPerPage()));
  }

  public updateDisplayedProducts() {
    this.displayedProducts.set(this.listProducts().slice(0, this.itemsPerPage()));
  }

  public onRecordsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage.set(+selectElement.value);
    this.updateDisplayedProducts();
  }

  public goToAddProduct() {
    this.router.navigateByUrl('save');
  }

  public getMenuItems(product: Product) {
    return [
      {
        label: 'Editar',
        action: () => this.goToEditProduct(product)
      },
      {
        label: 'Eliminar',
        action: () => this.confirmDeleteProject(product)
      }
    ];
  }

  public goToEditProduct(product: Product) {
    this.productsService.changeProduct(product);
    this.router.navigateByUrl('edit');
  }

  public confirmDeleteProject(product: Product): void {
    this.productSelected.set(product);
    console.log(this.productSelected)
    this.messageDelete.set(`¿Estás seguro de eliminar el producto ${product.name}?`);
    this.visible.set(true);
  }

  public deleteProduct(): void {
    this.isLoading.set(true)
    this.productsService.delete(this.productSelected()!.id).pipe(catchError(err => {
      this.isLoading.set(false)
      return EMPTY
    })).subscribe(() => {
      this.getProducts()
      this.toogleModal()
    })
  }

  public toogleModal() {
    this.visible.set(!this.visible())
  }

}
