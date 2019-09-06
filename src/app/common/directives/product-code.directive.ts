import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[productcode]'
})
export class ProductCodeDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('keyup')
  onChange() {
    this.el.nativeElement.value = this.el.nativeElement.value
      .toUpperCase()
      .replace(/^(\d{2})(\d{3})?/, '$1-$2');
  }

}
