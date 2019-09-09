import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './list/product-list.component';
import { ProductFormComponent } from './form/product-form.component';
import { RouteGuard } from 'src/app/common/utils/route.guard';

const routes: Routes = [
  {
    path: '', component: ProductListComponent, canActivate: [RouteGuard],
    data: { roles: ['user', 'manager'] }
  },
  {
    path: 'add', component: ProductFormComponent, canActivate: [RouteGuard],
    data: { roles: ['manager'] }
  },
  {
    path: 'add/:id', component: ProductFormComponent, canActivate: [RouteGuard],
    data: { roles: ['manager'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
