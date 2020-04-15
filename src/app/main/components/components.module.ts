import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { GlucoseItemComponent } from './glucose-item/glucose-item.component';
import { BaseItemComponent } from './base-item/base-item.component';
import { BloodPressureItemComponent } from './blood-pressure-item/blood-pressure-item.component';


@NgModule({
  declarations: [BaseItemComponent, GlucoseItemComponent, BloodPressureItemComponent],
  imports: [SharedModule],
  exports: [BaseItemComponent, GlucoseItemComponent, BloodPressureItemComponent]
})
export class ComponentsModule {}
