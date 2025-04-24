import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageComponent } from './list-page.component';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/entities/Product';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputSearchDebouncedComponent } from '../../components/input-search-debounced/input-search-debounced.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let productsServiceMock: jasmine.SpyObj<ProductsService>;
  let routerMock: jasmine.SpyObj<Router>;

  // Datos mock con la interfaz 
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setFullYear(futureDate.getFullYear() + 1);

  const mockProducts: Product[] = [
    {
      id: '001',
      name: 'Producto 1',
      description: 'Descripción 1',
      logo: 'logo1.png',
      date_release: currentDate,
      date_revision: futureDate
    },
    {
      id: '002',
      name: 'Producto 2',
      description: 'Descripción 2',
      logo: 'logo2.png',
      date_release: currentDate,
      date_revision: futureDate
    },
    {
      id: '003',
      name: 'Producto 3',
      description: 'Descripción 3',
      logo: 'logo3.png',
      date_release: currentDate,
      date_revision: futureDate
    },
    {
      id: '004',
      name: 'Producto 4',
      description: 'Descripción 4',
      logo: 'logo4.png',
      date_release: currentDate,
      date_revision: futureDate
    },
    {
      id: '005',
      name: 'Producto 5',
      description: 'Descripción 5',
      logo: 'logo5.png',
      date_release: currentDate,
      date_revision: futureDate
    },
    {
      id: '006',
      name: 'Producto 6',
      description: 'Descripción 6',
      logo: 'logo6.png',
      date_release: currentDate,
      date_revision: futureDate
    }
  ];

  beforeEach(async () => {
    // Crear mocks
    productsServiceMock = jasmine.createSpyObj('ProductsService', ['get', 'delete', 'changeProduct']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Configurar comportamiento default del mock
    productsServiceMock.get.and.returnValue(of(mockProducts));
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ListPageComponent,
        InputSearchDebouncedComponent,
        ButtonComponent,
        DropdownMenuComponent,
        DialogComponent,
        SkeletonComponent
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //verifica que se llame al metodo getProducts 
  it('should load products on init', () => {
    spyOn(component, 'getProducts').and.callThrough();

    component.ngOnInit();

    expect(component.getProducts).toHaveBeenCalled();
  });


  //verifica que trajo los productos y que los muestre en display products
  it('should get products from service and update displayed products', () => {
    component.getProducts();

    expect(productsServiceMock.get).toHaveBeenCalled();
    expect(component.listProducts()).toEqual(mockProducts);
    expect(component.displayedProducts().length).toBe(5);
    expect(component.isLoading()).toBeFalse();
  });

  //verifica filtro de busqueda
  it('should filter products correctly when searching', () => {
    component.getProducts();

    component.searchDebounced('Producto 1');

    expect(component.displayedProducts().length).toBe(1);
    expect(component.displayedProducts()[0].name).toBe('Producto 1');
  });


  //verifica que se llame al metodo getProducts cuando el filtro de busqueda sea vacio
  it('should reload all products when search is empty', () => {
    component.getProducts();
    component.searchDebounced('Producto 1');

    spyOn(component, 'getProducts').and.callThrough();

    component.searchDebounced('');

    expect(component.getProducts).toHaveBeenCalled();
  });


  // verfica que se navege a la pagina de crear producto
  it('should navigate to add product page', () => {
    component.goToAddProduct();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('save');
  });

    // verfica que se navege a la pagina de editar producto

  it('should navigate to edit product page', () => {
    const product = mockProducts[0];
    component.goToEditProduct(product);

    expect(productsServiceMock.changeProduct).toHaveBeenCalledWith(product);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('edit');
  });


  //verifica que se abra el dialog de confirmacion 
  it('should open confirmation dialog when confirming delete', () => {
    const product = mockProducts[0];
    component.confirmDeleteProject(product);
    
    expect(component.productSelected()).toEqual(product);
    expect(component.messageDelete()).toBe(`¿Estás seguro de eliminar el producto ${product.name}?`);
    expect(component.visible()).toBeTrue();
  });

  //verifica el metodo toogleModal
  it('should toggle modal visibility', () => {
    component.visible.set(false);
    
    component.toogleModal();
    expect(component.visible()).toBeTrue();
    
    component.toogleModal();
    expect(component.visible()).toBeFalse();
  });
});
