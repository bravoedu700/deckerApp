import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnosPagePage } from './turnos-page.page';

const routes: Routes = [
  {
    path: '',
    component: TurnosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnosPagePageRoutingModule {}
