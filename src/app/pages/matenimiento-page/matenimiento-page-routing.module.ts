import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatenimientoPagePage } from './matenimiento-page.page';

const routes: Routes = [
  {
    path: '',
    component: MatenimientoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatenimientoPagePageRoutingModule {}
