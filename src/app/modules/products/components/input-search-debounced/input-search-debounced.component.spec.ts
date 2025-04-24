import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchDebouncedComponent } from './input-search-debounced.component';

describe('InputSearchDebouncedComponent', () => {
  let component: InputSearchDebouncedComponent;
  let fixture: ComponentFixture<InputSearchDebouncedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchDebouncedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputSearchDebouncedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //verifica que el control de búsqueda emite un valor después de un retraso de 500ms
  it('should emit the search value after debounce', (done) => {
    spyOn(component.onSearch, 'emit');

    component.searchControl.setValue('test');

    setTimeout(() => {
      expect(component.onSearch.emit).toHaveBeenCalledWith('test');
      done();
    }, 600);
  });
});
