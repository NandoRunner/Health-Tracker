import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { BaseItemComponent } from './base-item/base-item.component';
import { BaseHeaderComponent } from './base-header/base-header.component';
import { BaseItemHeaderComponent } from './base-item-header/base-item-header.component';

@NgModule({
  declarations: [BaseItemComponent,  BaseHeaderComponent, BaseItemHeaderComponent],
  imports: [SharedModule],
  exports: [BaseItemComponent, BaseHeaderComponent, BaseItemHeaderComponent]
})
export class ComponentsModule {}
