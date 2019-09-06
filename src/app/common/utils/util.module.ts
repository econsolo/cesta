import { NgModule } from '@angular/core';
import { UtilService } from './util.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatSnackBarModule
  ],
  declarations: [],
  exports: [],
  providers: [
    UtilService
  ]
})
export class UtilModule {
}
