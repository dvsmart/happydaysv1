import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AlbumModule } from './album/album.module';
import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './httpInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { NgxGalleryModule } from 'ngx-gallery';
import { CommonModule } from '@angular/common';
import { HomeService } from './home/home.service';
import { HomeLayoutComponent } from './_layout/home-layout/home-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    HomeLayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AlbumModule,
    NgxGalleryModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, 
    useClass: MyHttpInterceptor, 
    multi: true 
}, CookieService,HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
