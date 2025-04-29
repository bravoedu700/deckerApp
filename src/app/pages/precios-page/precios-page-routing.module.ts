import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreciosPagePage } from './precios-page.page';

const routes: Routes = [
  {
    path: '',
    component: PreciosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreciosPagePageRoutingModule {}
