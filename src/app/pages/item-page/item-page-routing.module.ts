import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPagePage } from './item-page.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPagePage
  },
  {
    path: ':id',
    component: ItemPagePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPagePageRoutingModule { }
