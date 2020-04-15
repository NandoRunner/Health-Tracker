import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { WeightSavePage } from './weight-save.page';

const routes: Routes = [
  {
    path: '',
    component: WeightSavePage
  }
];

@NgModule({
  imports: [SharedModule,  RouterModule.forChild(routes)],
  declarations: [WeightSavePage]
})
export class WeightSavePageModule {}
