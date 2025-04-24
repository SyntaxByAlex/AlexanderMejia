import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;
  let form: FormGroup;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);

    const fb = new FormBuilder();
    form = fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      date_release: ['', [Validators.required]],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('isValidField', () => {
    // verifica si el campo es valido
    it('should return false if field is untouched', () => {
      expect(service.isValidField('name', form)).toBeFalsy();
    });

    // verifica si el campo ha sido tocado y tiene errores debe retornar true

    it('should return true if field is touched and has errors', () => {
      const nameControl = form.get('name');
      nameControl?.markAsTouched();
      nameControl?.setValue('abc'); // Muy corto
      nameControl?.updateValueAndValidity();
      expect(service.isValidField('name', form)).toBeTrue();
    });
  });


  describe('getFieldError', () => {
    it('should return required message', () => {
      // verifca un campo requerido vacío para verificar que el mensaje sea el esperado
      const nameControl = form.get('name');
      nameControl?.markAsTouched();
      nameControl?.setValue('');
      nameControl?.updateValueAndValidity();

      expect(service.getFieldError('name', form)).toContain('Este campo es requerido');
    });

    it('should return minlength message', () => {
      // verifica un campo con valor muy corto para probar el mensaje de minlength
      const nameControl = form.get('name');
      nameControl?.setValue('abc'); // Menos de 5 caracteres
      nameControl?.markAsTouched();
      nameControl?.updateValueAndValidity();

      expect(service.getFieldError('name', form)).toContain('mínimo');
    });

    it('should return maxlength message', () => {
      // verifica un campo con valor muy largo para probar el mensaje de maxlength
      const nameControl = form.get('name');
      nameControl?.setValue('abcdefghijk'); // Más de 10 caracteres
      nameControl?.markAsTouched();
      nameControl?.updateValueAndValidity();

      expect(service.getFieldError('name', form)).toContain('máximo');
    });

    it('should return null if no errors', () => {
      // verifica el campo es válido, el método debe retornar null
      const nameControl = form.get('name');
      nameControl?.setValue('ValidName'); // Cumple con longitud
      nameControl?.markAsTouched();
      nameControl?.updateValueAndValidity();

      expect(service.getFieldError('name', form)).toBeNull();
    });

    it('should return custom date error', () => {
      // verifica un error personalizado  para verificar que el mensaje se muestre
      const dateControl = form.get('date_release');
      dateControl?.setErrors({ invalidDate: true });
      dateControl?.markAsTouched();

      expect(service.getFieldError('date_release', form)).toContain('La fecha debe ser mayor');
    });
  });
});
