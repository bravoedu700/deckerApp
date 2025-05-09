import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { ProductosProvider } from './../../services/productos';
import { ActivatedRoute } from '@angular/router';
import { AgenciasProvider } from '../../services/agencias';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.page.html',
  styleUrls: ['./whatsapp.page.scss'],
})
export class WhatsappPage implements OnInit {
  public todo: UntypedFormGroup;
  loading: any;
  completed: boolean = false;
  datospersonales: any;
  agencias: any;
  @Input() item: any;

  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    zoom: 'yes',
    hideurlbar: 'yes',
    toolbar: 'no',
    hidenavigationbuttons: 'yes',
  };

  nrowhat = '5492262411046';

  constructor(
    public navCtrl: NavController,
    private formBuilder: UntypedFormBuilder,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    private prodsProvider: ProductosProvider,
    private activatedRoute: ActivatedRoute,
    private agenciasProv: AgenciasProvider,
    private iab: InAppBrowser) { }


  ngOnInit() {
    this.presentLoading();
    this.getTelefono();

    this.datospersonales = this.getLocalStorage();

    this.todo = this.formBuilder.group({
      nombre: [this.datospersonales.nombre],
      localidad: [this.datospersonales.localidad],
      email: [this.datospersonales.email],
      telefono: [''],
      mensaje: [''],
      agencia: [''],
      vehiculo: [''],
      tipo_contacto:['Whatsapp'],
      chasis: [''],
      piezas:[''],
      fecha_asistencia: [''],
      tipo_mantenimiento:[''],
      unidad:['']
    });
    
    if(this.activatedRoute.snapshot.params.id){
      let itemId = this.activatedRoute.snapshot.params.id;
      this.prodsProvider.getItem(itemId).subscribe(
        (item) => {
          this.item = item; 
          this.todo.get('unidad').setValue(itemId);
          this.logForm();
        },
        (error) => console.log(error)
      );
    }

  }

  getTelefono(){
    this.agenciasProv.getTelefonos().subscribe(
      (tel:any) => {
        this.nrowhat = tel.ventas; 
      }
    );
  } 

  setLocalStorage(datospersonales) {
    window.localStorage.datospersonales = JSON.stringify(datospersonales);
  }

  getLocalStorage() {
    return JSON.parse(window.localStorage.datospersonales || '[]');
  }

  async logForm() {
    //await this.loading.present()
      try {
        // Código asincrónico que puede generar una promesa rechazada
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
              //console.log(error)
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

  urlWhatsapp(values:any){ 
    let text = ' Hola';

    if(values.nombre)
      text += ', mi nombre es ' + values.nombre;  

    if(this.item) 
      text = text + ', me interesa la unidad: '+ this.item.vehicle_model +' \n https://usados.deckercamiones.com.ar/usados/unidad/'+ this.item.vehicle_id +'/' 

    if(values.localidad)
      text += '\n Soy de: ' + values.localidad;  
    
    if(values.email)
      text += '\n Mi email es: ' + values.email;
      
    if(values.mensaje!="")  
      text += '\n Comentarios: ' + values.mensaje;

    return 'https://wa.me/' + this.nrowhat+  '?text=' + encodeURI(text);
  }
 
}
