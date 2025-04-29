import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RepuestosPagePageRoutingModule } from './repuestos-page-routing.module';
import { RepuestosPagePage } from './repuestos-page.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({ 
  imports: [
    CommonModule,
    IonicModule,
    RepuestosPagePageRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [RepuestosPagePage]
})

export class RepuestosPagePageModule {}
