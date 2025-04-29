import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'seguro',
    loadChildren: () => import('./pages/seguro/seguro.module').then(m => m.SeguroPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'whatsapp',
    loadChildren: () => import('./pages/whatsapp/whatsapp.module').then(m => m.WhatsappPageModule)
  },

  {
    path: 'about',
    loadChildren: () => import('./pages/about-page/about-page.module').then(m => m.AboutPagePageModule)
  },
  {
    path: 'agencia',
    loadChildren: () => import('./pages/agencias-page/agencias-page.module').then(m => m.AgenciasPagePageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contact-page/contact-page.module').then(m => m.ContactPagePageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./pages/item-page/item-page.module').then(m => m.ItemPagePageModule)
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./pages/matenimiento-page/matenimiento-page.module').then(m => m.MatenimientoPagePageModule)
  },
  {
    path: 'precios',
    loadChildren: () => import('./pages/precios-page/precios-page.module').then(m => m.PreciosPagePageModule)
  },
  {
    path: 'repuestos',
    loadChildren: () => import('./pages/repuestos-page/repuestos-page.module').then(m => m.RepuestosPagePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search-page/search-page.module').then(m => m.SearchPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPagePageModule)
  },
  {
    path: 'turnos',
    loadChildren: () => import('./pages/turnos-page/turnos-page.module').then(m => m.TurnosPagePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'filter-page',
    loadChildren: () => import('./pages/filter-page/filter-page.module').then(m => m.FilterPagePageModule)
  },
  {
    path: 'image-gallery',
    loadChildren: () => import('./pages/image-gallery/image-gallery.module').then( m => m.ImageGalleryPageModule)
  },
  {
    path: 'seguro',
    loadChildren: () => import('./pages/seguro/seguro.module').then( m => m.SeguroPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
