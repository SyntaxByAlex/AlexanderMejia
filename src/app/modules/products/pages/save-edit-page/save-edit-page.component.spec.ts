import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditPageComponent } from './save-edit-page.component';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../../../services/validation.service';

describe('SaveEditPageComponent', () => {
  let component: SaveEditPageComponent;
  let fixture: ComponentFixture<SaveEditPageComponent>;
  let mockProductsService: any;
  let mockRouter: any;
  let mockValidationService: any;



  beforeEach(async () => {

    mockProductsService = {
      currentProduct: of(null),
      post: jasmine.createSpy().and.returnValue(of({})),
      put: jasmine.createSpy().and.returnValue(of({})),
      verify: jasmine.createSpy().and.returnValue(of(true))
    };

    mockRouter = {
      url: '',
      navigateByUrl: jasmine.createSpy()
    };

    mockValidationService = {
      isValidField: jasmine.createSpy().and.returnValue(true),
      getFieldError: jasmine.createSpy().and.returnValue(null)
    };


    await TestBed.configureTestingModule({
      imports: [SaveEditPageComponent],
      providers: [
        FormBuilder,
        { provide: ProductsService, useValue: mockProductsService },
        { provide: Router, useValue: mockRouter },
        { provide: ValidationService, useValue: mockValidationService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SaveEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //verifica que se llame al metodo post
  it('should call post method if not in edit mode', () => {
    mockRouter.url = '/new';
    component.saveEditProject();
    expect(mockProductsService.post).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //verifica si esta en modo edicion
  it('should call put method if in edit mode', () => {
    mockRouter.url = '/edit';
    component.saveEditProject();
    expect(mockProductsService.put).toHaveBeenCalled();
  });


  //verifica que el labal del boton cambie al editar
  it('should set labelButton to "Editar" if in edit mode', () => {
    mockRouter.url = '/edit';
    component.ngOnInit();
    expect(component.labelButton).toBe('Editar');
  });

  // verifica que se que se haga un adicion de un año
  it('should calculate date with one year added', () => {
    const inputDate = new Date('2024-01-01');
    const result = component.addOneYear(inputDate);
    expect(result).toBe('2025-01-01');
  });

  //verifica que se limpie el formulario cuando se vaya a la pagina de nuevo
  it('should reset form when cleanProjectForm is called (new)', () => {
    mockRouter.url = '/new';
    component.cleanProjectForm();
    expect(component.projectForm.get('name')?.value).toBeNull();
  });
});
