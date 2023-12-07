import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule),
  },
  {
    path: 'book',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
