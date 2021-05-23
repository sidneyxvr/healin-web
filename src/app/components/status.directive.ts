import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[status]'
})
export class StatusDirective implements OnInit {

  @Input('status') value: boolean;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef, 
    ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'badge');

    if(this.value){
      this.renderer.addClass(this.elementRef.nativeElement, 'badge-success');
      this.renderer.appendChild(this.elementRef.nativeElement, this.renderer.createText('Ativo'))
    }
    else{
      this.renderer.addClass(this.elementRef.nativeElement, 'badge-danger');
      this.renderer.appendChild(this.elementRef.nativeElement, this.renderer.createText('Inativo'))
    }
  }

}
