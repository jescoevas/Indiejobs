import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AppGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    canActivate:[LoginGuard],
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'trabajo/:id',
    loadChildren: () => import('./pages/trabajo/trabajo.module').then( m => m.TrabajoPageModule)
  },
  {
    path: 'form-trabajo',
    loadChildren: () => import('./pages/form-trabajo/form-trabajo.module').then( m => m.FormTrabajoPageModule)
  },
  {
    path: 'top-trabajadores',
    loadChildren: () => import('./pages/top-trabajadores/top-trabajadores.module').then( m => m.TopTrabajadoresPageModule)
  },
  {
    path: 'top-trabajos',
    loadChildren: () => import('./pages/top-trabajos/top-trabajos.module').then( m => m.TopTrabajosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
