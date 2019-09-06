import { Directive, ElementRef, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[number]'
})
export class NumberDirective {

  constructor(private el: ElementRef,
    private decimalPipe: DecimalPipe) {

  }

  @HostListener('keyup')
  onChange() {
    this.el.nativeElement.value = this.decimalPipe.transform(
      this.el.nativeElement.value.replace(/[,]/g, ''));
  }

}
