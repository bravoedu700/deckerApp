import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GlobalsProvider {

  // Must have / at the end
  readonly API_URL: string = "https://api.rutasurtrucks.com.ar/";
  readonly USED_URL: string = "https://usados.rutasurtrucks.com.ar/";
  readonly API_KEY: string = "https://api.rutasurtrucks.com.ar/key";
  readonly SHARE_URL: string = "https://usados.deckercamiones.com.ar/";

}
