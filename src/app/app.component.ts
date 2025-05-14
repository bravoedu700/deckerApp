

import { AboutPagePage } from './pages/about-page/about-page.page';

import { ItemPagePage } from './pages/item-page/item-page.page';
import { LoginPagePage } from './pages/login-page/login-page.page';
import { PreciosPagePage } from './pages/precios-page/precios-page.page';
import { AgenciasPagePage } from './pages/agencias-page/agencias-page.page';
import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { register } from "swiper/element/bundle"

import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AgenciasProvider } from './services/agencias';

import { SeguroPage } from './pages/seguro/seguro.page';
import { AuthenticationProvider } from './services/authentication';
import { ToastController } from '@ionic/angular';

import { CategoriesPage } from './pages/categories/categories';
import { ProductosProvider } from "./services/productos";
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

declare var plugins: any;

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  public selectedIndex = 0;
  public hasPermission: boolean;
  public token: string;
  options: any[] = [];
  isAutenticated = false;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private agenciasProvider: AgenciasProvider,
    private auth: AuthenticationProvider,
    private deeplinks: Deeplinks,
    public toastController: ToastController,
    public navCtrl: NavController,
    private prodsProvider: ProductosProvider,
    // private oneSignal: OneSignal
  ) { 
    platform.ready().then(() => {
      this.OneSignalInit();
    });
  }

  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.OneSignalInit();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.iniDeepLink();
    });

  }

  OneSignalInit(){
  // Uncomment to set OneSignal device logging to VERBOSE  
  //   OneSignal.Debug.setLogLevel(6);
    
  //   Uncomment to set OneSignal visual logging to VERBOSE  
  //   OneSignal.Debug.setAlertLevel(6);
  
    plugins.OneSignal.setAppId("2355dbbb-abaa-456a-8a77-e224b2b957b8");
    
    plugins.OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
  }


  ngAfterViewInit() {
    this.initializeApp();
    this.isAutenticated = this.auth.isAuthenticated();
    this.auth.logged.subscribe(x => this.initializeMenu());
    this.initializeMenu();
    
  }

  iniDeepLink(){ 
    this.deeplinks.route({ 
      '/usados/unidad/:itemId/': ItemPagePage,
      '/usados/unidad/:itemId': ItemPagePage
    }).subscribe(match => {
      
      console.log(JSON.stringify(match)); 
      
      if(match.$args.itemId){
        this.navCtrl.navigateForward(['item/' + match.$args.itemId]);
      }
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
    }, nomatch => {
      
      // nomatch.$link - the full link data 
      console.error('Got a deeplink that didn\'t match', nomatch);
      console.log(JSON.stringify(nomatch)); 
      
    }); 

  } 

  initializeMenu(){
    // Esperamos a obtener los datos de la agencia, y luego creamos todo el menu
    this.agenciasProvider.getAgencias().subscribe(
      (agenciasData: any) => {
        this.options = new Array<any>();

        this.options.push({
          displayName: 'INICIO',
          url: 'home',
          component: CategoriesPage,
          // This option is already selected
          selected: true
        });

        this.options.push({
          displayName: 'COTIZÁ TU SEGURO',
          url: 'seguro', 
          component: SeguroPage,
          // This option is already selected
          selected: true
        });

        let agencias = [];
        agenciasData.forEach((agencia: any) => {
          agencias.push({
            displayName: agencia.company_name,
            url: 'agencia/' + agencia.company_id,
            component: AgenciasPagePage,
            custom: agencia
          });
        });

        this.options.push({
          displayName: 'AGENCIAS',
          subItems: agencias
        });

        this.options.push({
          displayName: 'CATEGORIAS',
          url: 'categorias',
          component: CategoriesPage
        });

        if (this.auth.isAuthenticated()) {
          this.options.push({
            displayName: 'CERRAR SESIÓN',
            url: 'salir',
            component: LoginPagePage,
            custom: {
              logout: true
            }
          });
          this.options.push({
            displayName: 'LISTA DE PRECIOS',
            url: 'precios',
            component: PreciosPagePage
          });
        }
        else {
          this.options.push({
            displayName: 'INICIAR SESIÓN',
            url: 'login',
            component: LoginPagePage
          });
        }
 
        this.options.push({
          displayName: 'ACERCA DE LA APLICACIÓN',
          url: 'about',
          component: AboutPagePage
        });


      },
      error => {

        this.options = new Array<any>();
        this.options.push({
          displayName: 'INICIO',
          url: 'home',
          component: CategoriesPage,
          // This option is already selected
          selected: true
        });
      }



    );
  }

  public selectOption(option): void {
    // Si se eligio cerrar sesion, eliminamos los datos que estaban guardados en la app
    if (option.custom && option.custom.logout) {
      this.auth.logout();
      this.presentToast('Se ha cerrado la sesión');
      this.initializeMenu(); //Actualizamos los menus  (para eliminar el cerrar sesion si se inicio)
      this.navCtrl.navigateForward(['']);
    }
  }

  async presentToast(msj) {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const toast = await this.toastController.create({
        message: msj,
        duration: 2000
      });
      toast.present();

    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }

  }

}




