import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepuestosPagePage } from './repuestos-page.page';

const routes: Routes = [
  {
    path: '',
    component: RepuestosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepuestosPagePageRoutingModule {}
