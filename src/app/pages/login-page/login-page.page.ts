import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { AuthenticationProvider } from '../../services/authentication';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  userData = {
    username: "",
    password: ""
  }
  disabled: boolean;

  constructor(
    public navCtrl: NavController,
    private auth: AuthenticationProvider,
    public loadingCtrl: LoadingController,
    public toastController: ToastController
  ) { }

  ngOnInit() {

  }

  ionViewDidLoad() {
    //this.disabled = true;
  }

  /*
  checkInput(e) {
    if (this.userData.username != "" && this.userData.password != "") 
      this.disabled = false;
    else 
      this.disabled = true;
  }
  */

  async login() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Verificando los datos...',
        duration: 2000
      });
  
      if (this.userData.username != "" && this.userData.password != ""){ 
        await loading.present();
        this.auth.login(this.userData).then((data) => {
  
          loading.onDidDismiss();
  
          this.navCtrl.navigateRoot('categorias');
          let toast = this.presentToast('Sesión iniciada correctamente');
        }, (err) => {
          loading.onDidDismiss();
          let toast = this.presentToast('El usuario o la contraseña ingresados no son válidos');
        });
      }else{
        let toast = this.presentToast('El usuario o la contraseña ingresados no son válidos');
      }
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }

  }

  async presentLoading() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Verificando los datos...',
        duration: 2000
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }

  async presentToast(msj) {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const toast = await this.toastController.create({
        message: msj,
        duration: 5000
      });
      toast.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }

}