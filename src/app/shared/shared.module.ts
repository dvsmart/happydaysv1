import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
  ],
  exports:[
    MaterialModule,
    UploadComponent,
  ],
  declarations: [UploadComponent, DialogComponent]
})
export class SharedModule { }
