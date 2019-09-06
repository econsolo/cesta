import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'app', loadChildren: 'src/app/internal/internal.module#InternalModule' },
  { path: 'auth', loadChildren: 'src/app/external/external.module#ExternalModule' },
  { path: '**', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
