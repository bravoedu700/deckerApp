import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SkeletonItemComponent } from './skeleton-item/skeleton-item';
import { OfertasComponent } from './ofertas/ofertas';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [SkeletonItemComponent, OfertasComponent],
	imports: [CommonModule, IonicModule],
	exports: [SkeletonItemComponent, OfertasComponent]
})
export class ComponentsModule { }    