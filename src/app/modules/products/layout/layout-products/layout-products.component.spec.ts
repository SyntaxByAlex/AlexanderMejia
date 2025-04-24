import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProductsComponent } from './layout-products.component';
import { provideRouter, RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
 
describe('LayoutProductsComponent', () => {
  let component: LayoutProductsComponent;
  let fixture: ComponentFixture<LayoutProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Si el componente es standalone, se importa aquí directamente
      imports: [LayoutProductsComponent, RouterOutlet],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Asegura que el componente se cree correctamente
  it('should create the layout component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  // Test 2: Verifica que la imagen del logo se renderiza en el DOM
  it('should render the logo image', () => {
    // Busca la imagen por su clase CSS
    const img = fixture.debugElement.query(By.css('.banner-logo'));

    // Verifica que exista en el DOM
    expect(img).toBeTruthy();

    // Verifica que el src contenga el nombre del archivo (esto depende del path final)
    expect(img.nativeElement.src).toContain('logo-banco.png');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 3: Verifica que exista un router-outlet en el template
  it('should contain a router-outlet', () => {
    // Busca el componente RouterOutlet en el DOM renderizado
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));

    // Verifica que el router-outlet esté presente
    expect(outlet).toBeTruthy();
  });
});
