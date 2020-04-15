import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToggleComponent],
  imports: [IonicModule, TranslateModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LogoutButtonComponent,
    MenuToggleComponent
  ]
})
export class SharedModule {}
