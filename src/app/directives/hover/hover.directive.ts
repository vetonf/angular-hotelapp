import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  // @Input acts as the default value if the property is not set, e.g 'color' in template where the directive is applied
  @Input() color: string = 'red';
  backgroundColor: string = 'yellow';

  constructor(
    private element: ElementRef,
    // document acts as a wrapper and returns the whole document object where the built-in methods are available
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    console.log('ElementRef HoverDirective:', this.element.nativeElement);
  }

  ngOnInit(): void {
    this.element.nativeElement.style.color = this.color;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.backgroundColor
    );
  }

  // @HostListener is listening to events on components where the directive is applied
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'orange'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.backgroundColor
    );
  }
}
