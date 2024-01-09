import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{

  @Input() backgroundcolor: string = 'green';
  color: string = 'white';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log('Hover Directive called');
    console.log(this.element.nativeElement);
   }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.backgroundcolor;
    // this.element.nativeElement.style.color = this.color;
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.backgroundcolor);
    this.renderer.setStyle(this.element.nativeElement, 'color', this.color); 
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'red');
    this.renderer.setStyle(this.element.nativeElement, 'color', this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'white');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'black');
    }

}

