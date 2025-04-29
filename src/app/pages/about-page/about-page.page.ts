import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.page.html',
  styleUrls: ['./about-page.page.scss'],
})
export class AboutPagePage implements OnInit {

  public version: string;
  
  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    zoom: 'yes',
    hideurlbar: 'yes',
    toolbar: 'no',
    hidenavigationbuttons: 'yes',
  };

  constructor(
    private appVersion: AppVersion,
    private iab: InAppBrowser) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(v => {
      this.version = v;
    });
  }

  open() {

    //<a class="ion-home color-primary item" href="#" onclick="window.open('http://example.com/login/{{user._id}}', '_system', 'location=yes'); return false;"> Dashboard</a>


//    window.open('https://usados.deckercamiones.com.ar/privacidad/', '_system', 'location=yes'); 
  //  return false;

    const browser = this.iab.create('https://usados.deckercamiones.com.ar/privacidad/','_system', this.options);
    //browser.show();
  }

  openbp(){
    const browser = this.iab.create('https://bpsistemas.com','_system', this.options);

//    const browser = this.iab.create('https://bpsistemas.com');
    browser.show();

 //window.open('https://bpsistemas.com', '_system', 'location=yes'); 
// return false;



  }

}
