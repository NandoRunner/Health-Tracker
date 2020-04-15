import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { GlucoseSavePage } from './glucose-save.page';

const routes: Routes = [
  {
    path: '',
    component: GlucoseSavePage
  }
];

@NgModule({
  imports: [SharedModule,  RouterModule.forChild(routes)],
  declarations: [GlucoseSavePage]
})
export class GlucoseSavePageModule {}
