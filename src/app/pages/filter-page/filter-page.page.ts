import { Component, Input, OnInit } from '@angular/core';
//import { ViewController, NavParams } from '@ionic/angular';
import { AgenciasProvider } from '../../services/agencias';
import { FeedbackProvider } from '../../services/feedback';
import { FilterProvider } from '../../services/filter';
import { ProductosProvider } from '../../services/productos';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.page.html',
  styleUrls: ['./filter-page.page.scss'],
})
export class FilterPagePage implements OnInit {

  @Input() selectedFilter: any; // cualquier item dentro de marcas/agencias
  @Input() category: any; // from that category

  brands: any[] = [];
  agencies: any[] = [];
  colors: any[] = [];
  models: any[] = [];
  years: any[] = [];
  larges: any[] = [];

  selectedStatus: any;
  selectedBrand: any;
  selectedModel: any;
  selectedFuel: any;
  selectedColor: any;
  selectedLarge: any;
  selectedYear: any;
  selectedCompany: any;


  constructor(
    //private viewCtrl: ViewController,
    //private params: NavParams,
    private modalCtrl: ModalController,
    private agenciasProvider: AgenciasProvider,
    private feedbackProvider: FeedbackProvider,
    private activatedRoute: ActivatedRoute,
    private filterProvider: FilterProvider) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {


    //this.selectedFilter = this.params.get('selectedFilter');
    //this.selectedFilter = this.activatedRoute.snapshot.paramMap.get('selectedFilter');



    console.log(this.selectedFilter);


    if (this.selectedFilter) {
      this.selectedStatus = this.selectedFilter.state;
      this.selectedBrand = this.selectedFilter.brand;
      this.selectedModel = this.selectedFilter.model;
      this.selectedFuel = this.selectedFilter.fuel;
      this.selectedColor = this.selectedFilter.color;
      this.selectedYear = this.selectedFilter.year;
      this.selectedLarge = this.selectedFilter.large;
      this.selectedCompany = this.selectedFilter.company;

    }

    //this.category = this.params.get('category');
    //this.category = this.activatedRoute.snapshot.paramMap.get('category');

    this.agenciasProvider.getAgencias().subscribe(
      (agencias: any) => this.agencies = agencias,
      error => this.feedbackProvider.sendError()
    );

    this.filterProvider.getBrands(this.category.type_id).subscribe(
      (brands: any) => this.brands = brands,
      error => this.feedbackProvider.sendError(error)
    );

    this.filterProvider.getColors(this.category.type_id).subscribe(
      (colors: any) => this.colors = colors,
      error => this.feedbackProvider.sendError()
    );

    this.filterProvider.getModels(this.category.type_id).subscribe(
      (models: any) => this.models = models,
      error => this.feedbackProvider.sendError()
    );

    this.filterProvider.getYears(this.category.type_id).subscribe(
      (years: any) => this.years = years,
      error => this.feedbackProvider.sendError()
    );

    this.filterProvider.getLarges(this.category.type_id).subscribe(
      (larges: any) => this.larges = larges,
      error => this.feedbackProvider.sendError()
    );

  }

  filter() {

    this.modalCtrl.dismiss({
      type: this.category.type_id,
      state: this.selectedStatus,
      brand: this.selectedBrand,
      model: this.selectedModel,
      fuel: this.selectedFuel,
      color: this.selectedColor,
      large: this.selectedLarge,
      year: this.selectedYear,
      company: this.selectedCompany
    });

  }

  reset() {
    this.selectedStatus = '';
    this.selectedBrand = '';
    this.selectedModel = '';
    this.selectedFuel = '';
    this.selectedColor = '';
    this.selectedYear = '';
    this.selectedLarge = '';
    this.selectedCompany = '';

    this.selectedFilter = undefined;
    console.log(this);
  }

  dismiss() {
    //this.viewCtrl.dismiss();
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}