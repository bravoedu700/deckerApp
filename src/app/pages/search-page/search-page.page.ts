import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { ProductosProvider } from '../../services/productos';
import { AuthenticationProvider } from '../../services/authentication';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  sarchTerm: string;
  items: any[] = []; // Items that are currently being shown on the page
  msj = '';
  //  @ViewChild(Content) content: Content;


  constructor(
    public navCtrl: NavController,
    public prodsProvider: ProductosProvider,
    public auth: AuthenticationProvider,
    public activatedRoute: ActivatedRoute

  ) { }


  ngOnInit() {
    //this.auth = auth;

    if (typeof this.activatedRoute.snapshot.params.query !== undefined) {
      this.sarchTerm = this.activatedRoute.snapshot.params.query;
      this.msj = 'Buscando " ' + this.sarchTerm + '"';
      this.prodsProvider.getSearch(this.sarchTerm).subscribe(
        (items: any[]) => { this.items = items },
        (error) => { console.log(error); this.items = []; this.msj = 'No hay elementos para mostrar' },
      );
    }
  }


  itemSelected(item) {
    this.navCtrl.navigateForward(['item/' + item.vehicle_id], item);
  }


}
