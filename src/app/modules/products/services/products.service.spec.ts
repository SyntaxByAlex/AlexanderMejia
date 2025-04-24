import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environments';
import { provideHttpClient } from '@angular/common/http';
import { Product } from '../interfaces/entities/Product';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // verificar que no haya solicitudes pendientes
  afterEach(() => {
    httpMock.verify();
  });

  // verifica método get debe obtener todos los productos correctamente
  it('should fetch all products', () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          name: 'Product A',
          description: 'Desc A',
          logo: 'logo-a.png',
          date_release: new Date('2025-01-01'),
          date_revision: new Date('2026-01-01')
        },
        {
          id: '2',
          name: 'Product B',
          description: 'Desc B',
          logo: 'logo-b.png',
          date_release: new Date('2025-02-01'),
          date_revision: new Date('2026-02-01')
        }
      ]
    };

    service.get().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Product A');
      expect(products[1].description).toBe('Desc B');
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // verifica metodo POST  debe enviar correctamente un nuevo producto con todos sus campos
  it('should create a new product with all fields', () => {
    const newProduct: Product = {
      id: '3',
      name: 'Product C',
      description: 'New product description',
      logo: 'logo-c.png',
      date_release: new Date('2025-05-01'),
      date_revision: new Date('2026-05-01')
    };

    service.post(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });


  // verifica metood PUT  debe actualizar un producto existente
  it('should update a product with all fields', () => {
    const updatedProduct: Product = {
      id: '1',
      name: 'Product A Updated',
      description: 'Updated description',
      logo: 'logo-a-updated.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2026-01-01')
    };

    service.put(updatedProduct).subscribe(product => {
      expect(product.name).toBe('Product A Updated');
      expect(product.description).toBe('Updated description');
    });

    const req = httpMock.expectOne(`${apiUrl}/products/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });


  //verifica metodo DELETE debe eliminar un producto por su ID
  it('should delete a product', () => {
    const productId = '1';

    service.delete(productId).subscribe(response => {
      expect(response).toBe('Producto eliminado');
    });

    const req = httpMock.expectOne(`${apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Producto eliminado');
  });


  // verifica metodo VERIFY debe verificar si un producto existe  con ese id
  it('should verify a product', () => {
    const productId = '1';

    service.verify(productId).subscribe(isValid => {
      expect(isValid).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/products/verification/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

});
