import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppVersion } from '@ionic-native/app-version/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, TranslateModule],
  bootstrap: [AppComponent],
  providers: [AppVersion]
})
export class AppModule {}
