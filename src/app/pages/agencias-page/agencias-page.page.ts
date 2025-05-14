import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { NavController, NavParams } from '@ionic/angular';
import { AgenciasProvider } from '../../services/agencias';

@Component({
  selector: 'app-agencias-page',
  templateUrl: './agencias-page.page.html',
  styleUrls: ['./agencias-page.page.scss'],
})
export class AgenciasPagePage implements OnInit {

  agenciaId: undefined;
  agenciaData: any;
  imagenes: any;

  constructor(
    //  public navCtrl: NavController,
    //  public navParams: NavParams,
    private activatedRoute: ActivatedRoute,
    private agenciasProv: AgenciasProvider) { }

  ngOnInit() {


    if (typeof this.activatedRoute.snapshot.params.id !== undefined)
      this.agenciaId = this.activatedRoute.snapshot.params.id;

    this.agenciasProv.getAgencias().subscribe(
      (ag: [any]) => {
        //console.log(ag);
        this.agenciaData = ag.find(e => {
          if(e.company_id == this.agenciaId)
            return e;
          //console.log(e);
          //return e;
        })
      },
      (error) => console.log(error)
    );


    this.agenciasProv.getImagenesAgencia(this.agenciaId).subscribe(imagenes => {
      this.imagenes = imagenes;
    });
  }
}
