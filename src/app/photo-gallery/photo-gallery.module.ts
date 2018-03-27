import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PhotoService } from './services/photo.service';
import { PhotoGalleryComponent } from './photo-gallery.component';

import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxGalleryModule
  ],
  providers:[PhotoService],
  declarations: [PhotoGalleryComponent]
})
export class PhotoGalleryModule { }
