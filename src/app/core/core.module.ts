import { NgModule } from '@angular/core';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { SharedModule } from '../shared/shared.module';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PhotoService } from '../shared/services/photo.service';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    NgxGalleryModule,
  ],
  providers:[AuthService,AuthguardService],
  declarations: [LoginComponent, SignupComponent]
})
export class CoreModule { }
