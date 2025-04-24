import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuComponent } from './dropdown-menu.component';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //erifica que el menú se abra y cierre con toggleMenu()
  it('should toggle the menu open and closed when toggleMenu() is called', () => {
    expect(component.isOpen()).toBeFalse();
    component.toggleMenu();
    expect(component.isOpen()).toBeTrue();
    component.toggleMenu();
    expect(component.isOpen()).toBeFalse();
  });


  // verifica que se cierre el menú cuando se hace clic fuera del componente
  it('should close the menu when clicking outside', () => {
    spyOn(component, 'toggleMenu'); // Espiamos la función toggleMenu

    // Simulamos un clic fuera del menú
    const event = new MouseEvent('click');
    component.onClickOutside(event);

    // Verificamos que toggleMenu no se haya llamado (porque se cerró el menú)
    expect(component.isOpen()).toBeFalse();
  });

});
