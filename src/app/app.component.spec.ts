import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Verifica que exista un router-outlet en el template
  it('should contain a router-outlet', () => {
    // Busca el componente RouterOutlet en el DOM renderizado
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
    // Verifica que el router-outlet esté presente
    expect(outlet).toBeTruthy();
  });

});
