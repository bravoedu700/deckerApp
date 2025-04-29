import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton-item',
  templateUrl: 'skeleton-item.html',
  styleUrls: ['./skeleton-item.scss']
})

export class SkeletonItemComponent implements OnInit {
  @Input() width: any;
  @Input() height: any;
  @Input() radius: any;
  styles: any = {};

  ngOnInit() {

    this.styles = {
      width: this.width ? this.width : '100%',
      height: this.height ? this.height : '16px'
    }

    if (typeof this.radius !== 'undefined' && this.radius !== '') {
      this.styles.borderRadius = this.radius;
    }

  }
}

