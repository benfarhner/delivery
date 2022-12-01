import { ElementRef, Directive } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';

@Directive({
  selector: '[autofocus]'
})
export class Autofocuser {
  constructor(private element: ElementRef, private keyboard: Keyboard) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.element.nativeElement.focus();
      this.keyboard.show();
    }, 0);
  }
}