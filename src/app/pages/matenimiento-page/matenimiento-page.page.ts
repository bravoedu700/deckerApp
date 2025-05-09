import { Component, OnInit } from '@angular/core';
import { ProductosProvider } from './../../services/productos';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AgenciasProvider } from './../../services/agencias';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-matenimiento-page',
  templateUrl: './matenimiento-page.page.html',
  styleUrls: ['./matenimiento-page.page.scss'],
})

export class MatenimientoPagePage implements OnInit {

  todo: UntypedFormGroup;
  loading: any;
  completed: boolean = false;
  datospersonales: any;
  agencias: any;
  nrowhat = '5492915077611';

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
    private prodsProvider: ProductosProvider,
    public loadingCtrl: LoadingController, 
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private agenciasProvider: AgenciasProvider,
    private iab: InAppBrowser
  ) {
  }

  ngOnInit() {
    this.presentLoading();
    this.getTelefono();
    this.datospersonales = this.getLocalStorage();

    this.agenciasProvider.getAgencias().subscribe(
      (agenciasData: any) => {
        this.agencias = agenciasData; 
    });

    this.todo = this.formBuilder.group({
      nombre: [this.datospersonales.nombre],
      localidad: [this.datospersonales.localidad],
      email: [this.datospersonales.email],
      telefono: [''],
      mensaje: [''],
      agencia: [this.datospersonales.agencia],
      vehiculo: [this.datospersonales.vehiculo], 
      tipo_contacto:['mantenimineto'],
      chasis: [''],
      piezas:[''],
      fecha_asistencia: [''],
      tipo_mantenimiento:['']
    });

  } 

  getTelefono(){
    this.agenciasProvider.getTelefonos().subscribe(
      (tel:any) => {
        this.nrowhat = tel.repuestos; 
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

  logForm(){             
     
    this.loading.present();
    this.setLocalStorage(this.todo.value);

    this.prodsProvider.sendServiceContact(this.todo.value)
      .subscribe(
        (data) => {
          setTimeout(() => {
            this.loading.dismiss(); 
            const browser = this.iab.create(this.urlWhatsapp(this.todo.value),'_system', this.options);
            this.navCtrl.pop(); 
            this.navCtrl.navigateForward(['categorias']);
          }, 1000);
        },
        (error) => {
          //console.log(error);
          this.loading.dismiss();
          this.presentAlert();
        }
      )
  }

   presentAlert() {
    this.loading = this.alertController.create({
      cssClass: '',
      header: 'Error',
      subHeader: 'El mensaje no se pudo enviar.',
      message: 'Verifique su conexión e intente nuevamente más tarde..',
      buttons: ['OK']
    });
    this.loading.present();
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

  urlWhatsapp(values:any){ 

    let text = ' Hola';

    if(values.nombre)
      text += ', mi nombre es ' + values.nombre;  
    
    if(values.localidad)
      text += ', soy de ' + values.localidad;
      
    text += ' necesito un turno para mantenimiento.';  

    if(values.vehiculo)
      text += ' \n Vehiculo: ' + values.vehiculo;
      
    if(values.agencia)  
      text += ' \n Agencia: ' + values.agencia;

    if(values.chasis!="")  
      text += ' \n Nro. Chasis: ' + values.chasis;
 
    if(values.tipo_mantenimiento!="")  
      text += ' \n Tipo de Mantenimiento: ' + values.tipo_mantenimiento;
 
    if(values.fecha_asistencia != "")   
      text += ' \n Fecha estimada: ' + values.fecha_asistencia;

    if(values.email)
      text += ' \n Mi email es: ' + values.email;
      
    if(values.mensaje!="")  
      text += '\n Comentarios: ' + values.mensaje; 

    return 'https://wa.me/' + this.nrowhat+  '?text=' + encodeURI(text);
    
  } 

}
