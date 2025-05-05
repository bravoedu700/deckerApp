import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AgenciasProvider } from './services/agencias';
import { ProductosProvider } from './services/productos';
import { GlobalsProvider } from './services/globals';
import { FeedbackProvider } from './services/feedback';
import { FilterProvider } from './services/filter';
import { AuthenticationProvider } from './services/authentication';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
//import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ComponentsModule,
        HttpClientModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Deeplinks,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ProductosProvider,
        AgenciasProvider,
        AuthenticationProvider,
        GlobalsProvider,
        FeedbackProvider,
        FilterProvider,
        SocialSharing,
        AppVersion,
        InAppBrowser
    ],
    bootstrap: [AppComponent]
})
export class AppModule {


}
