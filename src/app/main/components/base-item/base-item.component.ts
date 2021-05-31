import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

import { BaseModel } from '../../models/base.model';

@Component({
  selector: 'app-base-item',
  templateUrl: './base-item.component.html',
  styleUrls: ['./base-item.component.scss'],
})
export class BaseItemComponent {
  @Input() item: any;
  @Input() values: number;
  @Output() update = new EventEmitter<BaseModel>();
  @Output() delete = new EventEmitter<BaseModel>();

  constructor(public platform: Platform) {}
}
