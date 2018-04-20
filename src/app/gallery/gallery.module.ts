import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRouteModule } from './gallery-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { PhotoService } from '../shared/services/photo.service';
import { AlbumService } from '../album/service/album.service';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GalleryRouteModule,
    NgxGalleryModule,
    Ng2ImgMaxModule
  ],
  providers:[PhotoService,AlbumService],
  declarations: [GalleryComponent,PhotoGalleryComponent]
})
export class GalleryModule { }
