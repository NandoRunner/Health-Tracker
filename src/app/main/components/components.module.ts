import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BaseItemComponent } from './base-item/base-item.component';
import { BloodPressureItemComponent } from './blood-pressure-item/blood-pressure-item.component';

@NgModule({
  declarations: [BaseItemComponent, BloodPressureItemComponent],
  imports: [SharedModule],
  exports: [BaseItemComponent, BloodPressureItemComponent]
})
export class ComponentsModule {}
