import { Injectable } from '@angular/core';
import { AuthenticationProvider } from './authentication';
import { GlobalsProvider } from './globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})


export class ProductosProvider {

  private myoptions: any;

  constructor(public http: HttpClient,
    private auth: AuthenticationProvider,
    private globals: GlobalsProvider) {

    this.myoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': this.auth.getAuthToken()
      })
    };

  }

  getItem(id) {
    if (this.auth.isAuthenticated()) {
      this.setAgainToken();
      return this.http.get(this.globals.API_URL + "vendedores/vehiculos/" + id, this.myoptions);
    }
    else
      return this.http.get(this.globals.API_URL + "vehiculos/" + id);
  }

  getItems() {
    if (this.auth.isAuthenticated()) {
      this.setAgainToken();
      return this.http.get(this.globals.API_URL + "vendedores/vehiculos/", this.myoptions);
    }
    else
      return this.http.get(this.globals.API_URL + "vehiculos/");
  }

  getItemsByCategory(category, offset = 0) {
    if (this.auth.isAuthenticated()) {
      this.setAgainToken();
      return this.http.get(this.globals.API_URL + "vendedores/vehiculos/?type=" + category + "&offset=" + offset + '&limit=20', this.myoptions);
    }
    else
      return this.http.get(this.globals.API_URL + "vehiculos/?type=" + category + "&offset=" + offset + '&limit=20');
  }


  getListaDePrecios() {
    if (this.auth.isAuthenticated()) {
      this.setAgainToken();
      return this.http.get(this.globals.API_URL + 'precios', this.myoptions);
    }
    else
      return this.http.get(this.globals.API_URL + 'precios');
  }

  getBanners() {
    return this.http.get(this.globals.API_URL + "banners")
  }

  getCategories() {
    return this.http.get(this.globals.API_URL + "categorias")
  }

  getCategoriesById(id) {
    return this.http.get(this.globals.API_URL + "categorias/" + id);
  }

  getItemImages(item_id) {
    return this.http.get(this.globals.API_URL + "vehiculos/" + item_id + "/imagenes");
  }

  sendContact(postData: any) {
    return this.http.post(this.globals.API_URL + 'vehiculos/contacto/', postData);
  }

  getSearch(query: string) {
    if (this.auth.isAuthenticated()) {
      this.setAgainToken();
      return this.http.get(this.globals.API_URL + "vendedores/search?query=" + query, this.myoptions);
    }
    else
      return this.http.get(this.globals.API_URL + "vehiculos/search?query=" + query);
  }

  setAgainToken() {
    this.myoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': this.auth.getAuthToken()
      })
    };
  }

  sendServiceContact(postData: any){
    return this.http.post(this.globals.API_URL + 'servicios/contacto/', postData);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return console.log('Something bad happened; please try again later.');
  };

}
