import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'cms',
    canActivate: [adminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //preloadingStrategy: PreloadAllModules // Esta estrategia solo usarla cuando no tengas muchos modulos que precargar
    //preloadingStrategy: CustomPreloadService // Estrategia personalizada
    preloadingStrategy: QuicklinkStrategy // Estrategia que carga modulos de acuerdo a los links que esten visibles en la pantalla del usuario
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
