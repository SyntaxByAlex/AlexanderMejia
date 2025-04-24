import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutProductsComponent } from './layout/layout-products/layout-products.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProductsComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/list-page/list-page.component').then(m => m.ListPageComponent)
      },
      {
        path: 'save',
        loadComponent: () => import('./pages/save-edit-page/save-edit-page.component').then(m => m.SaveEditPageComponent)
      },
      {
        path: 'edit',
        loadComponent: () => import('./pages/save-edit-page/save-edit-page.component').then(m => m.SaveEditPageComponent)
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
