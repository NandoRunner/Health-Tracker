import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BaseItemComponent } from './base-item/base-item.component';

@NgModule({
  declarations: [BaseItemComponent],
  imports: [SharedModule],
  exports: [BaseItemComponent]
})
export class ComponentsModule {}
