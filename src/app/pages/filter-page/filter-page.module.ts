import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterPagePageRoutingModule } from './filter-page-routing.module';

import { FilterPagePage } from './filter-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPagePageRoutingModule
  ],
  declarations: [FilterPagePage]
})
export class FilterPagePageModule {}
