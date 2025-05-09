import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swiper, { Zoom, Navigation, Pagination } from 'swiper';

Swiper.use([Zoom, Navigation, Pagination]);

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: 'gallery-viewer.html',
  styleUrls: ['/gallery-viewer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryViewerComponent implements OnInit {
  @Input() images: { src: string; alt?: string }[] = [];
  @Input() initialIndex: number = 0;
  @Input() scheme: 'light' | 'dark' = 'light';
  @Input() title: string = 'Galería';

  swiper: Swiper | null = null;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.swiper-container', {
      initialSlide: this.initialIndex,
      zoom: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      centeredSlides: true
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}