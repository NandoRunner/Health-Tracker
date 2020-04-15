import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BloodPressure } from '../../models/bloodpressure.model';

@Component({
  selector: 'app-blood-pressure-item',
  templateUrl: './blood-pressure-item.component.html',
  styleUrls: ['./blood-pressure-item.component.scss'],
})
export class BloodPressureItemComponent {

  @Input() item: BloodPressure;
  @Output() update = new EventEmitter<BloodPressure>();
  @Output() delete = new EventEmitter<BloodPressure>();

}
