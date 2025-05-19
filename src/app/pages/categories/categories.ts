
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ProductosProvider } from '../../services/productos';
import { FeedbackProvider } from '../../services/feedback';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AgenciasProvider } from '../../services/agencias';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  styleUrls: ['./categories.scss']

})
export class CategoriesPage implements OnInit {
  doneLoad: boolean = false;
  categories: any[];
  searchbox: boolean = false;
  querySearch: string = '';
  items: any;
  selectcategoriaParam = false;
  error = false;
  page: any = this;
  type_id = undefined;
  loading: any;

  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    zoom: 'yes',
    hideurlbar: 'yes',
    toolbar: 'no',
    hidenavigationbuttons: 'yes',
  };
  telefonos:any;
  nrowhat = '5492262609433';

  constructor(
    public navCtrl: NavController,
    //    public navParams: NavParams,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private prodsProvider: ProductosProvider,
    private feedbackProvider: FeedbackProvider,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private agenciasProv: AgenciasProvider
  ) { }

  ngOnInit() {

    if (typeof this.activatedRoute.snapshot.params.id !== undefined)
      this.type_id = this.activatedRoute.snapshot.params.id;

  }

  ngAfterViewInit() {
    this.initialize()
  }


  initialize() {


    if (this.type_id !== undefined) {
      this.selectcategoriaParam = true;
      this.prodsProvider.getCategoriesById(this.type_id).subscribe(
        (categories: any) => { this.categories = categories.hijos; this.doneLoad = true; },
        (error) => {
          console.log('se murio 1');
          console.log(JSON.stringify(error));
          this.doneLoad = true;
          this.error = true;
          this.feedbackProvider.sendError();

        }
      );
    }
    else {
      this.prodsProvider.getCategories().subscribe(
        (categories: any) => { this.categories = categories; this.doneLoad = true; },
        (error) => {
          console.log('se murio 3');
          console.log(JSON.stringify(error));
          this.doneLoad = true;
          this.error = true;
          this.feedbackProvider.sendError();
        }
      );
    }

    this.getTelefono();

  }

  getTelefono(){
    this.agenciasProv.getTelefonos().subscribe(
      (tel:any) => {
        this.telefonos = tel; 
      }
    );
  }

  openSearch() {
    var content = document.querySelector('ion-content');
    this.searchbox = this.searchbox == true ? false : true;
  }


  categorySelected(category) {
    let navigationExtras: NavigationExtras = category;

    if (parseInt(category.cant_hijos) > 0)
      this.navCtrl.navigateForward(['categorias', category.type_id], navigationExtras);
    else
      this.navCtrl.navigateForward(['listado', category.type_id], navigationExtras);
  }

  submit(e) {
    this.navCtrl.navigateForward(['search/' + this.querySearch]);
  }


  turnos() {
    this.navCtrl.navigateForward(['turnos']);
    //this.sendWhatsapp('Turnos', 'necesito un turno para el taller.',this.telefonos.taller);
  }

  repuestos() {
    this.navCtrl.navigateForward(['repuestos']);
    //this.sendWhatsapp('Repuestos', 'necesito presupuesto de repuestos.', this.telefonos.repuestos);
  }

  mantenimiento() {
    this.navCtrl.navigateForward(['mantenimiento']);
    //this.sendWhatsapp('Mantenimiento', 'necesito un turno para mantenimiento.',this.telefonos.taller);
  }

  whatsapp() {
    //this.navCtrl.navigateForward(['whatsapp']);
    this.sendWhatsapp('Ventas', '',this.telefonos.ventas);
  }


  sendWhatsapp(tipo, msj, nro){
    let data: any = {};
    data.tipo_contacto = tipo

    this.prodsProvider.sendServiceContact(data)
      .subscribe(
        (data) => {
          setTimeout(() => {
            
            let text = 'Hola ' + msj;
            let url = 'https://wa.me/' + nro + '?text=' + encodeURI(text);
            const browser = this.iab.create(url,'_system', this.options);

          }, 1000);
        } 
      );
  }
    
    

}
