import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MatenimientoPagePageRoutingModule } from './matenimiento-page-routing.module';
import { MatenimientoPagePage } from './matenimiento-page.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatenimientoPagePageRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [MatenimientoPagePage]
})
export class MatenimientoPagePageModule{}
