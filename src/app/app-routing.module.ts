import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFailedGuard } from './shared/guards/login-failed.guard';
import { ContentViewComponent } from './shared/components/content-view/content-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: ContentViewComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [LoginFailedGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./my-profile/my-profile.module').then(
            (m) => m.MyProfileModule
          ),
        canActivate: [LoginFailedGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
