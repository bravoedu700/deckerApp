import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ProductosProvider } from './../../services/productos';
import { AgenciasProvider } from './../../services/agencias';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-repuestos-page',
  templateUrl: './repuestos-page.page.html',
  styleUrls: ['./repuestos-page.page.scss'],
})
export class RepuestosPagePage implements OnInit {

  public todo: UntypedFormGroup;
  loading: any;
  completed: boolean = false;
  datospersonales: any;
  agencias: any;
  @Input() item: any;
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
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private prodsProvider: ProductosProvider,
    private agenciasProvider: AgenciasProvider,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.getTelefono();
    this.presentLoading();
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
      tipo_contacto:['repuestos'],
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

  async logForm() {
      try {
        // Código asincrónico que puede generar una promesa rechazada
        await this.loading.present();
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
        message: 'For favor Espere...',
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

  urlWhatsapp(values:any){ 
    
    
    let text = ' Hola';

    if(values.nombre)
      text += ', mi nombre es ' + values.nombre;  
    
    if(values.localidad)
      text += ', soy de ' + values.localidad;
      
    text += ' necesito presupuesto de repuestos.';  

    if(values.chasis!='') 
      text += ' \n Nro Chasis: ' + values.chasis;

    if(values.piezas!="")
      text += ' \n Nro Pieza: ' + values.piezas;

    if(values.email)
      text += ' \n Mi email es: ' + values.email;

    if(values.mensaje!="")  
      text += ' \n Comentarios: ' + values.mensaje;
    
    return 'https://wa.me/' + this.nrowhat+  '?text=' + encodeURI(text);
  }

}
