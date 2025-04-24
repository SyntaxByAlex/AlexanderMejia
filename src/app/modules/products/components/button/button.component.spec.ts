import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Verifica que se emita el evento `clicked` cuando se hace clic en el input
  it('should emit clicked event when input is clicked', () => {
    spyOn(component.clicked, 'emit'); // Espiamos la emisión del evento
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('click'); // Simula el clic

    expect(component.clicked.emit).toHaveBeenCalled(); // Verifica que se haya emitido
  });
});
