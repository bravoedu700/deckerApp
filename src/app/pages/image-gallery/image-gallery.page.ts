import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swiper from 'swiper';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {

  @Input() itemImages: any;
  @Input() initalSlide: any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

    //console.log(this.initalSlide, this.itemImages);
    

    this.loadSwipper();
  }

  loadSwipper(){
    const swiper = new Swiper('.gallery.swiper-container', {
      zoom: true,
      initialSlide: this.initalSlide,
      pagination: {
        el: '.gallery .swiper-pagination',
      }
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
