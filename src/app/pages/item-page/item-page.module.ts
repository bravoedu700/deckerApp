import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ItemPagePageRoutingModule } from './item-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemPagePage } from './item-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPagePageRoutingModule,
    FormsModule, ReactiveFormsModule

  ],
  declarations: [ItemPagePage]
})
export class ItemPagePageModule { }
