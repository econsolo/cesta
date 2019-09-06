import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudBottomsheetComponent } from './crud-bottomsheet/crud-bottomsheet.component';
import { MaterialModule } from 'src/app/core/material.module';

@NgModule({
  declarations: [
    CrudBottomsheetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    CrudBottomsheetComponent
  ]
})
export class ComponentsCommonModule { }
