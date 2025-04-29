import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TurnosPagePageRoutingModule } from './turnos-page-routing.module';
import { TurnosPagePage } from './turnos-page.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({ 
  imports: [
    CommonModule,
    IonicModule,
    TurnosPagePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TurnosPagePage]
})
export class TurnosPagePageModule {}
   