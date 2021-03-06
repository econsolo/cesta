import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalComponent } from './internal.component';

const routes: Routes = [{
  path: '', component: InternalComponent,
  children: [
    { path: 'products', loadChildren: 'src/app/internal/product/product.module#ProductModule' },
    { path: '**', redirectTo: 'products', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
