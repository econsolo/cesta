import { NgModule } from '@angular/core';
import { ProductCodeDirective } from './product-code.directive';
import { MoneyDirective } from './money.directive';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NumberDirective } from './number.directive';

@NgModule({
  declarations: [
    ProductCodeDirective,
    MoneyDirective,
    NumberDirective
  ],
  exports: [
    ProductCodeDirective,
    MoneyDirective,
    NumberDirective
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe
  ]
})
export class DirectivesModule {
}
