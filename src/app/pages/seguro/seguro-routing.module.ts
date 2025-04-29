import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguroPage } from './seguro.page';

const routes: Routes = [
  {
    path: '',
    component: SeguroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguroPageRoutingModule {}
