import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: 'image-viewer.html',
  styleUrls: ['./image-viewer.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() src: string = '';
  @Input() scheme: 'light' | 'dark' = 'light';
  @Input() title: string = 'Imagen';
  
  imageLoaded = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}