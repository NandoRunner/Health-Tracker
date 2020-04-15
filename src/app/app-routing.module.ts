import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'glucoses', loadChildren: './main/glucoses.module#GlucosesModule', canLoad: [AuthGuard] },
  {
    path: 'bloodpressures',
    loadChildren: './main/blood-pressures.module#BloodPressuresModule',
    canLoad: [AuthGuard]
  },
  { path: 'weights', loadChildren: './main/weights.module#WeightsModule', canLoad: [AuthGuard] },
  {
    path: 'language-popover',
    loadChildren: './main/pages/language-popover/language-popover.module#LanguagePopoverPageModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
