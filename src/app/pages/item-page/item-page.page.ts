import { ContactPagePage } from './../contact-page/contact-page.page';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, LoadingController } from "@ionic/angular";
import { AuthenticationProvider } from "../../services/authentication";
import { ProductosProvider } from "../../services/productos";

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { GlobalsProvider } from "../../services/globals";
import { ActivatedRoute } from '@angular/router';
import { ImageGalleryPage } from '../image-gallery/image-gallery.page';
import { ToastController } from '@ionic/angular';

import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer';


// import { ViewerModalComponent } from 'ngx-ionic-image-viewer';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.page.html',
  styleUrls: ['./item-page.page.scss'],
})
export class ItemPagePage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;


  item: any = {};
  itemId: any;
  itemImages: any[];
  privateImages: any[];
  auth;
  equipment: string[];
  codeVideo:any = '';
  loading: any;
  urlSafe: SafeResourceUrl;
  actual = 1;
  total = 0;

  constructor(
    public navCtrl: NavController,
    //public navParams: NavParams,
    private as: AuthenticationProvider,
    private prodsProvider: ProductosProvider,
    private modalController: ModalController,
    private socialSharing: SocialSharing,
    private globals: GlobalsProvider,
    public loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.auth = this.as;
    //this.item = navParams.get("item");
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.prodsProvider.getItem(this.itemId).subscribe(
      (item) => {
        
        //console.log(item); 
        this.item = item;

        if(this.item.vehicle_video != ''){
          this.codeVideo = this.getCode(this.item.vehicle_video);
          //console.log(this.codeVideo); 
          let url = 'https://www.youtube.com/embed/' + this.codeVideo;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }

        setTimeout( () => { 
          this.displayToast();
       }, 2000 ); 


        this.loadItemImages();
      },
      (error) => console.log(error)
    );

    //this.whatsapp = this.urlWhatsapp();

    this.itemImages = [];
    this.privateImages = [];
    if (this.item.vehicle_equipment) {
      this.equipment = this.item.vehicle_equipment.split(",");
    }
   
  }

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;

    swiperEl.addEventListener('slidechange', (e: any) => {
      this.getIndex(e);
    });
  }

  getCode(url){
    const myArr = url.split("watch?v=");
    if(myArr[1])
      return myArr[1];
    else 
      return '';
  }

  whatsapp(){
    this.navCtrl.navigateForward(['whatsapp', this.itemId]);
  }

  loadItemImages() {
    this.prodsProvider.getItemImages(this.itemId).subscribe((images: any[]) => {
      images.map((image) => {
        if (image.image_private == 0)
          this.itemImages.push(image);
        else
          this.privateImages.push(image);
      });

      this.total = this.itemImages.length;
    });
  }

  call(number) {
    //let newNumber = number.split("/")[0].replace(/\D/g, "");
  }

  async presentModalContacto() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const modal = await this.modalController.create({
        component: ContactPagePage,
        cssClass: 'my-custom-class',
        componentProps: {
          'item': this.item,
        }
      });
      return await modal.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }

  }

  contact() {
    this.presentModalContacto();
    //let profileModal = this.modalCtrl.create(ContactPage, this.item);
    //profileModal.present();
    //this.navCtrl.navigateForward(['contacto'], this.item);
  }

  async presentModalGallery(i) {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const modal = await this.modalController.create({
        component: ImageGalleryPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'itemImages': this.itemImages,
          'initalSlide' : i
        }
      });
      return await modal.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }

  share(){
    this.loading.present();
    let message = this.item.brand_name.toUpperCase() + " " + this.item.vehicle_model.toUpperCase();
    let id = this.item.vehicle_id;
    let url = this.globals.SHARE_URL + "usados/unidad/" + id + "/";
    this.socialSharing
      .share(message, "Publicación RutaSur Trucks", null, url)
      .then(() => {
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
      });
  }

  getDate(mysqlDate) {
    if (mysqlDate == "0000-00-00") {
      return "No mencionada";
    }
    else {
      let dateParts = mysqlDate.split("-");
      return (dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0]);
    }
  }

  displayToast(){
 
    if(this.item.vehicle_visits > 5){
      this.toastController.create({  
        header: '!!! UNIDAD HOT !!!', 
        message: 'Solo hoy ya lleva '+ this.item.vehicle_visits +' visitas.',
        position: 'bottom',
        animated: true,   
        duration: 5000,
        //color:'warning',  
        cssClass: 'toast-custom-class',
        buttons: [ 
          {   
            side: 'start',
            icon: 'flame',
            handler: () => {
              console.log('');
            }
          }, {
            side: 'end',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('');
            } 
          }
        ] 
      }).then((toast) => {
        toast.present();
      });
    }  
  }

  async presentLoading() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      this.loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Por favor Espere...',
      });
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }

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

  async ovenViewer(imgUrl) {

    try {
      // Código asincrónico que puede generar una promesa rechazada
      const modal = await this.modalController.create({
        component: ImageViewerComponent,
        componentProps: {
          src: imgUrl,
          scheme: 'dark',
          title: this.item.vehicle_model.toUpperCase()
        },
        cssClass: 'image-viewer-modal',
        keyboardClose: true,
        showBackdrop: true
      });
    
      return await modal.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }

    
  }

}
