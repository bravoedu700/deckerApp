import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from './globals';


@Injectable({
  providedIn: 'root',
})

export class AgenciasProvider {

  agencias: any[];

  constructor(private http: HttpClient, private globals: GlobalsProvider) {
  }

  getAgencias() {
    return this.http.get(this.globals.API_URL + "agencias");
  }

  getImagenesAgencia(agenciaId) {
    return this.http.get(this.globals.API_URL + "agencias/" + agenciaId + "/imagenes");
  }

  getTelefonos(){
    return this.http.get(this.globals.API_URL + "agencias/telefonos" );
  }

}
