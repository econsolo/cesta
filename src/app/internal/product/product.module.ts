import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductFormComponent } from './form/product-form.component';
import { ProductListComponent } from './list/product-list.component';
import { MaterialModule } from 'src/app/core/material.module';


@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
