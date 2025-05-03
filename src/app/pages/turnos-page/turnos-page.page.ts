import { Component, OnInit } from '@angular/core';
import { ProductosProvider } from './../../services/productos';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AgenciasProvider } from './../../services/agencias';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-turnos-page',
  templateUrl: './turnos-page.page.html',
  styleUrls: ['./turnos-page.page.scss'],
})

export class TurnosPagePage implements OnInit {
  
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
    hidenavigationbuttons: 'yes',
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
    ) { }

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
      agencia: [''],
      vehiculo: [''],
      tipo_contacto:['turno'],
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

  setLocalStorage(datospersonales){
    window.localStorage.datospersonales = JSON.stringify(datospersonales);
  }

  getLocalStorage(){
    return JSON.parse(window.localStorage.datospersonales || '[]');
  }

  closeModal(){
    this.navCtrl.pop();
  }

   logForm() {

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
          this.loading.dismiss();
          console.log("error al enviar, fallo el servicio");
          this.presentError();
        }
      )
  } 

  async presentError() {
     try {
      // Código asincrónico que puede generar una promesa rechazada
      this.loading =  this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'El mensaje no se pudo enviar.',
        message: 'El mensaje no se pudo enviar. Verifique su conexión e intente nuevamente más tarde.',
        buttons: ['OK']
      });
      this.loading.present();
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
      
    text += ' necesito un turno para el taller.';  

    if(values.email)
      text += '\n Mi email es: ' + values.email;
      
    if(values.mensaje!="")  
      text += '\n Comentarios: ' + values.mensaje;
      
    return 'https://wa.me/' + this.nrowhat+  '?text=' + encodeURI(text);
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

}
