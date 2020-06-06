import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BaseItemComponent } from './base-item/base-item.component';
import { BaseHeaderComponent } from './base-header/base-header.component';

@NgModule({
  declarations: [BaseItemComponent,  BaseHeaderComponent],
  imports: [SharedModule],
  exports: [BaseItemComponent, BaseHeaderComponent]
})
export class ComponentsModule {}
