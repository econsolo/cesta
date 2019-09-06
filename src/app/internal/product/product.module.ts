import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductFormComponent } from './form/product-form.component';
import { ProductListComponent } from './list/product-list.component';
import { MaterialModule } from 'src/app/core/material.module';
import { ComponentsCommonModule } from 'src/app/common/components/components-common.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';


@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    ComponentsCommonModule,
    DirectivesModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-BR'
    }
  ]
})
export class ProductModule { }
