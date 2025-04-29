import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ProductosProvider } from '../../services/productos';


@Component({
  selector: 'ofertas-component',
  templateUrl: 'ofertas.html',
  styleUrls: ['./ofertas.scss']
})

export class OfertasComponent implements OnInit {

  @ViewChild('slides', {static: true}) slides: IonSlides;

  elements: [] = [];
  doneLoad = false;
  actual = 0;
  total = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay:true,
    loop: true,
  };

  constructor(private prodsProvider: ProductosProvider) {
  }

  ngOnInit() {
    this.getBanners();
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

  getTotal(){ return this.total;}
  getActual(){ 
    if(this.actual > this.total )
      this.actual = this.actual - this.total;
    return this.actual;
  }
  getIndex(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
        this.actual = index;
    });
  }
}
