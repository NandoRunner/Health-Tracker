import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Weight } from '../../models/weight.model';

@Component({
  selector: 'app-base-item',
  templateUrl: './base-item.component.html',
  styleUrls: ['./base-item.component.scss'],
})
export class BaseItemComponent {

  @Input() item: Weight;
  @Output() update = new EventEmitter<Weight>();
  @Output() delete = new EventEmitter<Weight>();

}
