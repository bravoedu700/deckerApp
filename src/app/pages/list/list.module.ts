import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';


import { ListPage } from './list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule,
        ComponentsModule
    ],
    declarations: [ListPage]
})
export class ListPageModule { }
