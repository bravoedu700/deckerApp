import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenciasPagePageRoutingModule } from './agencias-page-routing.module';

import { AgenciasPagePage } from './agencias-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenciasPagePageRoutingModule
  ],
  declarations: [AgenciasPagePage]
})
export class AgenciasPagePageModule {}
