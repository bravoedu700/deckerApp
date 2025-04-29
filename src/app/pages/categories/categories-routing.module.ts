import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories';

const routes: Routes = [
    {
        path: '',
        component: CategoriesPage
    },
    {
        path: ':id',
        component: CategoriesPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriesPageRoutingModule { }
