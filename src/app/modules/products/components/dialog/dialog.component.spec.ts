import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Verifica que se emita el evento onAccept cuando se llama al método accept()
  it('should emit onAccept event when accept() is called', () => {
    spyOn(component.onAccept, 'emit');
    component.accept();
    expect(component.onAccept.emit).toHaveBeenCalled();
  });

  // verifica que se emita el evento nReject'cuando se llama al método reject()
  it('should emit onReject event when reject() is called', () => {
    spyOn(component.onReject, 'emit'); 
    component.reject(); 
    expect(component.onReject.emit).toHaveBeenCalled(); 
  });
});
