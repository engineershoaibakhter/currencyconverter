import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Allow numbers and one decimal point
    const regex = /^[0-9]*\.?[0-9]*$/;
    
    if (!regex.test(value)) {
      input.value = value.slice(0, -1);
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput = event.clipboardData?.getData('text/plain') || '';
    const regex = /^[0-9]*\.?[0-9]*$/;
    
    if (regex.test(pastedInput)) {
      document.execCommand('insertText', false, pastedInput);
    }
  }
}
