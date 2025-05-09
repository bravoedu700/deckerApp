import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AngularFirestore } from 'angularfire2/firestore';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

/*
  Generated class for the FcmServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})

export class FcmServiceProvider {

  constructor(
    public http: HttpClient,
    private firebase: Firebase,
//    private afs: AngularFirestore,
    private platform: Platform) { }



  async getToken() {
    try {
      // Código asincrónico que puede generar una promesa rechazada
      let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
      this.firebase.subscribe("decker2019android");
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      this.firebase.subscribe("decker2019ios");
      const perm = await this.firebase.grantPermission();
    }

    this.saveToken(token);
    } catch (error) {
      // Manejo del error
      console.error('Ocurrió un error:', error);
    }
  }

  private saveToken(token) {

    /*
    if (!token) return;
    console.log(token);

    const data = {
      token,
      userId: 'usuario'
    };


    let retorno = this.afs.collection('devices').doc(token).set(data);

    console.log("-------------retorno---------------")
    console.log(JSON.stringify(retorno));
    console.log("-------------fin retorno---------------")

    return retorno;


*/

  }




  onNotifications() {
    //return this.firebase.onNotificationOpen();


    return new Observable(observer => {
      (window as any).FirebasePlugin.onMessageReceived((response) => {
        observer.next(response);
      });
    });

  }












  /*
async getToken() {
let token;
 
if (this.platform.is('android')) {
token = await this.firebase.getToken();
}
 
if (this.platform.is('ios')) {
token = await this.firebase.getToken();
this.firebase.subscribe("consultoriosIOS");

const perm = await this.firebase.grantPermission();
*/
  /*


https://www.freecodecamp.org/news/how-to-get-push-notifications-working-with-ionic-4-and-firebase-ad87cc92394e/

  
  var data = JSON.stringify({
"to": "/topics/consultoriosIOS",
"notification": {
"body": "great match!",
"content_available": true,
"priority": "high",
"title": "Portugal vs. Denmark"
},
"data": {
"body": "great match!",
"content_available": true,
"priority": "high",
"title": "Portugal vs. Denmark"
}
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
console.log(this.responseText);
}
});

xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "key=AIzaSyCTsun7ZsSVexwBD0PavisFsxulnZHyZes");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ab2df298-57d7-4afe-a836-5a4056699570");

xhr.send(data);

  
  */

  /*
  
        }
    
        this.saveToken(token);
      }
    
      private saveToken(token) {
        //if (!token) return;
    
        const devicesRef = this.afs.collection('devices');
    
        const data = {
          token,
          userId: 'testUserId'
        };
    
        return devicesRef.doc(token).set(data);
      }
    
      onNotifications() {
        return this.firebase.onNotificationOpen();
      }
  
  */

}
