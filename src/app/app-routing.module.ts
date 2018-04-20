import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { AlbumComponent } from './album/components/album.component';
import { AuthguardService } from './core/services/authguard.service';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './_layout/home-layout/home-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      { path: 'Home', component: HomeComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthguardService],
    children: [
      //{ path: 'Home', component: HomeComponent },
      { path: 'Albums', loadChildren: 'app/album/album.module#AlbumModule' },
      { path: 'Gallery', loadChildren:'app/gallery/gallery.module#GalleryModule'},
      { path: 'Profile', loadChildren:'app/profile/profile.module#ProfileModule'},
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
