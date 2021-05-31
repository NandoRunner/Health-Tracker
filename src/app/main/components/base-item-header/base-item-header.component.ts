import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-base-item-header',
  templateUrl: './base-item-header.component.html',
  styleUrls: ['./base-item-header.component.scss'],
})
export class BaseItemHeaderComponent {
  @Input() values: number;
  @Input() cssName: string;
  @Input() colName: string;
  constructor(public platform: Platform) {}
}
