import { FilterPagePage } from './../filter-page/filter-page.page';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { ProductosProvider } from '../../services/productos';
import { AuthenticationProvider } from '../../services/authentication';
//import { FeedbackProvider } from '../../services/feedback';
import { FilterProvider } from '../../services/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  styleUrls: ['./list.scss']

})
export class ListPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items: any[]; // Items that are currently being shown on the page
  items_all: any[]; // All the items.
  category: any;
  doneLoad: boolean = false;
  defaultOffset: number = 20; // Se pide de a 15 items desde la API
  offset: number = this.defaultOffset; // Items cargados en este momento
  hasFilter: false;
  selectedFilter: any;
  autenticado = null;
  noMoreItems = false;
  catId = undefined;
  // @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    //public navParams: NavParams,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public prodsProvider: ProductosProvider,
    private authService: AuthenticationProvider,
    public modalController: ModalController,
    private filterProvider: FilterProvider) {
    this.selectedFilter = null;
    this.autenticado = authService;

    //console.log();

    this.catId = this.activatedRoute.snapshot.params.id

    this.activatedRoute.queryParams.subscribe((params) => {
      this.category = this.router.getCurrentNavigation().extras;
      this.initialize();
    });


  }

  itemSelected(item) {
    this.navCtrl.navigateForward(['item/' + item.vehicle_id]);
  }

  initialize() {
    this.filterProvider.clearFilter();
    this.prodsProvider.getCategoriesById(this.catId).subscribe(
      (cat) => this.category = cat,
      (error) => console.log(error)
    );

    this.prodsProvider.getItemsByCategory(this.catId).subscribe((items: any) => {
      this.items = items;
      this.items_all = this.items;
      this.doneLoad = true;
      this.hasFilter = false;
    },
      (error) => { //this.feedbackProvider.sendError()
        console.log(error);
      });
  }

  async presentModal() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      const modal = await this.modalController.create({
        component: FilterPagePage,
        cssClass: 'my-custom-class',
        componentProps: {
          'selectedFilter': this.selectedFilter,
          'category': this.category
        }
      });
  
      modal.onDidDismiss().then(
        (filter) => {
          if (filter) {
            this.selectedFilter = filter.data;
            // this.content.scrollToTop();
            console.log("scrooll to top");
  
            this.offset = this.defaultOffset;
  
  
  
            this.filterProvider.getResultsFiltered(this.selectedFilter).subscribe((items: any) => {
              this.items = items;
              this.items_all = this.items;
              this.doneLoad = true;
            },
              (error) => console.log(error)
            );
  
          }
        }
      )
  
      return await modal.present();
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }




  openFilterModal() {
    /*
    let filtersModal = this.modalCtrl.create(FilterPage, { selectedFilter: this.selectedFilter, category: this.category });
    filtersModal.onDidDismiss(filter => {



      if (filter) {
        this.selectedFilter = filter;
        // this.content.scrollToTop();
        console.log("scrooll to top");

        this.offset = this.defaultOffset;



        this.filterProvider.getResultsFiltered(filter).subscribe((items: any) => {
          this.items = items;
          this.items_all = this.items;
          this.doneLoad = true;
        },
          (error) => this.feedbackProvider.sendError());

      }
    });*/
    //filtersModal.present();
    //alert("mostrar modal");
  }

  doInfinite(scroll) {
    this.noMoreItems = false;

    if (this.filterProvider.isInUse() == false) {
      this.prodsProvider.getItemsByCategory(this.catId, this.offset).subscribe((items: any[]) => {

        this.offset = this.offset + this.defaultOffset;
        if (items.length > 0) {
          let _items = items;
          _items.forEach(item => {
            this.items.push(item);
          });
        }
        else {
          this.noMoreItems = true;
        }
        scroll.target.complete();
      },
        (error) => {
          scroll.target.complete();
          //this.feedbackProvider.sendError(true);
        });
    }
    else {
      console.log("fin resultados");
      this.noMoreItems = true;
      scroll.target.complete();
    }
  }

}
