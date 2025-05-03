import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosProvider } from '../../services/productos';

@Component({
  selector: 'ofertas-component',
  templateUrl: 'ofertas.html',
  styleUrls: ['./ofertas.scss']
})

export class OfertasComponent implements OnInit {

  @ViewChild('swiper') 
  swiperRef: ElementRef | undefined;

  elements: [] = [];
  doneLoad = false;
  actual = 1;
  total = 0;

  constructor(private prodsProvider: ProductosProvider) {
  }

  ngOnInit() {
    this.getBanners();
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;

    swiperEl.addEventListener('slidechange', (e: any) => {
      this.getIndex(e);
    });
  }

  getBanners() {
    this.doneLoad = true;
    this.prodsProvider.getBanners().subscribe(
      (elements: any) => {
        this.elements = elements; this.doneLoad = true;
        this.total = this.elements.length;
      },
      (error) => { this.doneLoad = true; console.log(error); }
    )
  }

  openSlides(i) {
    alert(i);
  }

  getTotal() { return this.total;}

  getActual() { return this.actual;}

  getIndex(e: any) {
    const swiper = e.detail[0];
    if(this.actual===this.total) {
      this.actual = 1;
      setTimeout(() => {
        swiper.slideTo(0, 0); 
      }, swiper.params.speed + 50); 
    } else {
      this.actual = swiper.activeIndex+1;
    }
  }
}
