import { Component, OnInit } from '@angular/core';
//import { IonicPage, NavController, NavParams } from '@ionic/angular';
import { ProductosProvider } from '../../services/productos';
import { AuthenticationProvider } from '../../services/authentication';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-precios-page',
  templateUrl: './precios-page.page.html',
  styleUrls: ['./precios-page.page.scss'],
})
export class PreciosPagePage implements OnInit {

  precios: any = [];
  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    zoom: 'yes',
    hideurlbar: 'yes',
    toolbar: 'no',
    hidenavigationbuttons: 'yes',
  };

  constructor(
    //public navCtrl: NavController,
    //public navParams: NavParams,
    public prodsProvider: ProductosProvider,
    private auth: AuthenticationProvider,
    private iab: InAppBrowser
  ) { }


  ngOnInit() {

    this.prodsProvider.getListaDePrecios().subscribe(
      (items) => {
        this.precios = items; console.log(items);
      },
      (error) => console.log(error)
    );
  }

  descargar(url){
    const browser = this.iab.create(url,'_system', this.options);
  }

}
