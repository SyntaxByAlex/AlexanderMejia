import { Routes } from '@angular/router';
import { LayoutProductsComponent } from './modules/products/layout/layout-products/layout-products.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
    }
];
