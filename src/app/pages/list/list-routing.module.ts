import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list';

const routes: Routes = [
    {
        path: '',
        component: ListPage
    },
    {
        path: ':id',
        component: ListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListPageRoutingModule { }
