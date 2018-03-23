import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { AlbumComponent } from './album/components/album.component';
import { AuthguardService } from './core/services/authguard.service';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { HomeComponent } from './home/home.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

const appRoutes: Routes = [
  { 
      path: '',
      component: AppLayoutComponent, 
      children: [
        { path: '', component: HomeComponent },
        { path: 'Albums', component: AlbumComponent },
        { path:'photos/:id',component:PhotoGalleryComponent },
      ],
      canActivate: [AuthguardService],
  },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
