import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SkeletonItemComponent } from './skeleton-item/skeleton-item';
import { OfertasComponent } from './ofertas/ofertas';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer/image-viewer';
import { GalleryViewerComponent } from './gallery-viewer/gallery-viewer';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	],
	declarations: [SkeletonItemComponent, OfertasComponent, ImageViewerComponent, GalleryViewerComponent],
	imports: [CommonModule, IonicModule],
	exports: [SkeletonItemComponent, OfertasComponent, ImageViewerComponent, GalleryViewerComponent],
	providers: [InAppBrowser],
})
export class ComponentsModule { }    