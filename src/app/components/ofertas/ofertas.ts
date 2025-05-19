import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosProvider } from '../../services/productos';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

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

  constructor(
    private prodsProvider: ProductosProvider,
    private iab: InAppBrowser
  ) {
  }

  ngOnInit() {
    this.getBanners();
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;
    swiperEl.addEventListener('slidechange', this.handleSlideChange);
  }

  handleSlideChange = (e: any) => {
    this.getIndex(e);
  }

  handleClick(banner_link: string) {
    this.iab.create(banner_link, '_system');
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
    this.actual = swiper.activeIndex + 1
  }

  ngOnDestroy() {
    if (this.swiperRef && this.swiperRef.nativeElement) {
      this.swiperRef.nativeElement.removeEventListener('slidechange', this.handleSlideChange);
    }
  }
}
