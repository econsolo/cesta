import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalComponent } from './external.component';


const routes: Routes = [{
  path: '', component: ExternalComponent,
  children: [
    { path: 'login', loadChildren: 'src/app/external/login/login.module#LoginModule' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalRoutingModule { }
