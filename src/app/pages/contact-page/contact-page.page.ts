import { Component, Input, OnInit } from '@angular/core';
import { ProductosProvider } from './../../services/productos';
import { NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.page.html',
  styleUrls: ['./contact-page.page.scss'],
})
 

export class ContactPagePage implements OnInit {
  public todo: FormGroup;
  loading: any;
  completed: boolean = false;
  //item: any;
  datospersonales: any;
  @Input() item: any;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private prodsProvider: ProductosProvider,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.datospersonales = this.getLocalStorage();
    this.todo = this.formBuilder.group({
      nombre: [this.datospersonales.nombre, Validators.required],
      localidad: [this.datospersonales.localidad, Validators.required],
      email: [this.datospersonales.email, Validators.email],
      telefono: [this.datospersonales.telefono, Validators.required],
      mensaje: [''],
      agencia: [''],
      vehiculo: [''],
      tipo_contacto:['Contacto'],
      chasis: [''],
      piezas:[''],
      fecha_asistencia: [''],
      tipo_mantenimiento:['']
    });
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
        this.prodsProvider.sendContact(this.todo.value)
          .subscribe(
            (data) => {
              setTimeout(() => {
                
                this.loading.dismiss();
                this.presentExito();
                this.navCtrl.pop();

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
        subHeader: 'El contacto fue enviado exitasamente.',
        message: 'A la brevedad se pondra en contacto unos de nuestros tecnicos.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }

}
