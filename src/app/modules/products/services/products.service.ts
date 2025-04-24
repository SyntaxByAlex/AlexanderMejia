import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from '../interfaces/entities/Product';
import { GetAllProducts } from '../interfaces/responses/get-all-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productSource = new BehaviorSubject<Product | null>(null);
  public currentProduct = this.productSource.asObservable();

  private readonly baseUrl = environment.apiUrl;
  private http = inject(HttpClient)

  public get(): Observable<Product[]> {
    const url = `${this.baseUrl}/products`;
    return this.http.get<GetAllProducts>(url).pipe(
      map(response => response.data),
      catchError(() => EMPTY)
    );
  }


  public post(body: Product): Observable<Product> {
    const url = `${this.baseUrl}/products`;
    return this.http.post<Product>(url, body);
  }


  public put(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/products/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  changeProduct(product: Product) {
    this.productSource.next(product);
  }

  public delete(idProduct: string) {
    const url = `${this.baseUrl}/products/${idProduct}`;
    return this.http.delete(url, { responseType: 'text' })
  }

  public verify(idProduct: string) {
    const url = `${this.baseUrl}/products/verification/${idProduct}`
    return this.http.get<boolean>(url)
  }
}
