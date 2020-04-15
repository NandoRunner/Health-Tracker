import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Glucose } from '../../models/glucose.model';

@Component({
  selector: 'app-glucose-item',
  templateUrl: './glucose-item.component.html',
  styleUrls: ['./glucose-item.component.scss'],
})
export class GlucoseItemComponent {

  @Input() item: Glucose;
  @Output() update = new EventEmitter<Glucose>();
  @Output() delete = new EventEmitter<Glucose>();

}
