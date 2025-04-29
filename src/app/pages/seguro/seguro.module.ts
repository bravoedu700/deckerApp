import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeguroPageRoutingModule } from './seguro-routing.module';
import { SeguroPage } from './seguro.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SeguroPageRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [SeguroPage]
})
export class SeguroPageModule {}
 