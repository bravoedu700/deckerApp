import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenciasPagePage } from './agencias-page.page';

const routes: Routes = [
  {
    path: '',
    component: AgenciasPagePage
  },
  {
    path: ':id',
    component: AgenciasPagePage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenciasPagePageRoutingModule { }
