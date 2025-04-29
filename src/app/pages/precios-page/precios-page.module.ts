import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreciosPagePageRoutingModule } from './precios-page-routing.module';

import { PreciosPagePage } from './precios-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreciosPagePageRoutingModule
  ],
  declarations: [PreciosPagePage]
})
export class PreciosPagePageModule {}
