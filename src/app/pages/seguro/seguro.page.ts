import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';

import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ProductosProvider } from './../../services/productos';
import { AgenciasProvider } from './../../services/agencias';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.page.html',
  styleUrls: ['./seguro.page.scss'],
})
export class SeguroPage implements OnInit {


  public todo: UntypedFormGroup;
  loading: any;
  completed: boolean = false;
  datospersonales: any;
  agencias: any;
  @Input() item: any;

  nrowhat = '5492262560936';

  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    zoom: 'yes',
    hideurlbar: 'yes',
    toolbar: 'no',
    hidenavigationbuttons: 'yes'
  };

  constructor(
    public navCtrl: NavController,
    private formBuilder: UntypedFormBuilder,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private prodsProvider: ProductosProvider,
    private agenciasProvider: AgenciasProvider,
    private activatedRoute: ActivatedRoute,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.getTelefono();
    this.datospersonales = this.getLocalStorage();
    this.agenciasProvider.getAgencias().subscribe(
      (agenciasData: any) => {
        this.agencias = agenciasData; 
        //console.log(agenciasData);  
    });

    this.todo = this.formBuilder.group({
    
      nombre: [this.datospersonales.nombre],
      localidad: [this.datospersonales.localidad],
      email: [this.datospersonales.email],
      telefono: [''],
      mensaje: [''],
      agencia: [''],
      vehiculo: [''],
      tipo_contacto:['seguro'],
      chasis: [''],
      piezas:[''],
      fecha_asistencia: [''],
      tipo_mantenimiento:['']

    });

    //this.logForm(); 
    
  }

  getTelefono(){
    this.agenciasProvider.getTelefonos().subscribe(
      (tel:any) => {
        this.nrowhat = tel.seguro; 
      }
    );
  }

  setLocalStorage(datospersonales) {
    window.localStorage.datospersonales = JSON.stringify(datospersonales);
  }

  getLocalStorage() {
    return JSON.parse(window.localStorage.datospersonales || '[]');
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async logForm() {
      try {
        // Código asincrónico que puede generar una promesa rechazada
        await this.loading.present();
        this.setLocalStorage(this.todo.value);
        this.prodsProvider.sendServiceContact(this.todo.value)
          .subscribe(
            (data) => {
              setTimeout(() => {
                
                //this.loading.dismiss(); 
                const browser = this.iab.create(this.urlWhatsapp(this.todo.value),'_system', this.options);
                this.navCtrl.pop(); 
                this.navCtrl.navigateForward(['categorias']);

              }, 500);
            },
            (error) => {
              this.loading.dismiss();
              this.presentAlert();
            }
          )
      } catch (error) {
        // Manejo del error
        console.error('Ocurrió un error:', error);
      }
  }

  async presentAlert() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const alert = await this.alertController.create({
        cssClass: '',
        header: 'Error',
        subHeader: 'El mensaje no se pudo enviar.',
        message: 'Verifique su conexión e intente nuevamente más tarde..',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
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

  async presentExito() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Exito',
        subHeader: 'El pedido de cotización fue enviado exitasamente.',
        message: 'A la brevedad se pondra en contacto unos de nuestros tecnicos.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  } 

  sendWhatsapp(){ 
    //this.loading.dismiss();
    const browser = this.iab.create(this.urlWhatsapp(this.todo.value),'_system', this.options);
    this.navCtrl.pop(); 
    this.navCtrl.navigateForward(['categorias']);
  }

  urlWhatsapp(values:any){ 
    
    let text = ' Hola'; 

    if(values.nombre)
      text += ', mi nombre es ' + values.nombre;  
    
    if(values.localidad)
      text += ', soy de ' + values.localidad;
      
    text += ', necesito cotizar un seguro.';  

    if(values.email)
      text += '\n Mi email es: ' + values.email;

    if(values.mensaje!="")  
      text += '\n Comentarios: ' + values.mensaje;
    
    text +='\n Muchas gracias.' 

    return 'https://wa.me/' + this.nrowhat+  '?text=' + encodeURI(text);
  }

}
