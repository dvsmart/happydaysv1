import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PhotoService } from './services/photo.service';
import { PhotoGalleryComponent } from './photo-gallery.component';

import { OwlModule,OwlCarousel } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OwlModule
  ],
  providers:[PhotoService],
  declarations: [PhotoGalleryComponent]
})
export class PhotoGalleryModule { }
