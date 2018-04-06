import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';



const galleryRoutes: Routes = [
  {path: 'photos/:id',component:PhotoGalleryComponent}
];


@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRouteModule { }
