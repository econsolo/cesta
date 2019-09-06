import { Directive, ElementRef, HostListener } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[money]'
})
export class MoneyDirective {

  constructor(private el: ElementRef,
    private currencyPipe: CurrencyPipe) {

  }

  @HostListener('keyup')
  onChange() {
    this.el.nativeElement.value = this.currencyPipe.transform(
      this.el.nativeElement.value.replace(/[R$,]/g, ''), 'R$');
  }

}
