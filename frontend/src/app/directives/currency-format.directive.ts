import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective implements OnInit {
  @Input() appCurrencyFormat: string = 'USD';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.formatCurrency();
  }

  private formatCurrency() {
    const value = this.el.nativeElement.textContent;
    if (value && !isNaN(value)) {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.appCurrencyFormat,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(parseFloat(value));
      this.el.nativeElement.textContent = formatted;
    }
  }
}
