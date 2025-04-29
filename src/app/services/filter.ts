import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from './globals';
import { AuthenticationProvider } from './authentication';

@Injectable({
  providedIn: 'root',
})

export class FilterProvider {

  private inUse = false;
  private myoptions: any;
  offset: number = 0;


  constructor(public http: HttpClient, private globals: GlobalsProvider, private auth: AuthenticationProvider) {
    this.clearFilter();
    this.myoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': this.auth.getAuthToken()
      })
    };
  }
  isInUse() {
    return this.inUse;
  }
  clearFilter() {
    this.offset = 0;
    this.inUse = false;
  }
  getBrands(category) {
    return this.http.get(this.globals.API_URL + "categorias/" + category + "/marcas");
  }
  getColors(category) {
    return this.http.get(this.globals.API_URL + "categorias/" + category + "/colores");
  }
  getModels(category) {
    return this.http.get(this.globals.API_URL + "categorias/" + category + "/modelos");
  }
  getYears(category) {
    return this.http.get(this.globals.API_URL + "categorias/" + category + "/anios");
  }
  getLarges(category) {
    return this.http.get(this.globals.API_URL + "categorias/" + category + "/largos");
  }
  getFilterToStringUrl(filtros) {

    /*
    "type" => "vehicle_type_id",
    "brand" => "vehicle_brand_id",
    "state" => "vehicle_state",
    "model" => "vehicle_model",
    "year" => "vehicle_year",
    "fuel" => "vehicle_fuel",
    "brake" => "vehicle_brake",
    "traction" => "vehicle_traction",
    "direction" => "vehicle_direction",
    "city" => "vehicle_city",
    "color" => "vehicle_color",
    "km" => "vehicle_km",
    "motor" => "vehicle_motor",
    "power" => "vehicle_power",
    "description" => "vehicle_description",
    "equipment" => "vehicle_equipment",
    "entry" => "vehicle_entry"
    */
    console.log(filtros);

    let filterString = "";

    Object.keys(filtros).forEach(filter => {

      console.log(filter);


      if (filtros[filter] !== undefined) {

        filterString += "&" + filter + "=" + filtros[filter];

      }
    });
    return filterString;
  }

  getResultsFiltered(filter) {
    this.inUse = true;
    let options = this.getFilterToStringUrl(filter);
    console.log(options);

    console.log("asd");

    if (this.auth.isAuthenticated())
      return this.http.get(this.globals.API_URL + "vendedores/vehiculos/?" + options, this.myoptions);
    else
      return this.http.get(this.globals.API_URL + "vehiculos/?" + options);
  }

}
