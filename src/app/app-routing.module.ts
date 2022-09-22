import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'glucoses', loadChildren: () => import('./main/glucoses.module').then(m => m.GlucosesModule), canLoad: [AuthGuard] },
  {
    path: 'blood-pressures',
    loadChildren: () => import('./main/blood-pressures.module').then(m => m.BloodPressuresModule),
    canLoad: [AuthGuard]
  },
  { path: 'weights', loadChildren: () => import('./main/weights.module').then(m => m.WeightsModule), canLoad: [AuthGuard] },
  {
    path: 'language-popover',
    loadChildren: () => import('./main/pages/language-popover/language-popover.module').then(m => m.LanguagePopoverPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
