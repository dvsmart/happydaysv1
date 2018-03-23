import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Album } from '../album/model/album.model';
import { Photo } from './models/photo.model';
import { PhotoService } from './services/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  @Input() album: Album;
  photos: Photo[];
  images:Array<string>;
  albumId: string;
  folderId:number;

  constructor(private photoAlbum: PhotoService,private route:ActivatedRoute) {
    this.images = [];
   }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.albumId = id.toString();
    this.folderId = id;
    this.loadImages(id);
    this.images.push("http://via.placeholder.com/350x150");
    this.images.push("http://via.placeholder.com/350x150");
    this.images.push("http://via.placeholder.com/350x150");
    this.images.push("http://via.placeholder.com/350x150");
    this.images.push("http://via.placeholder.com/350x150");
  }

  loadImages(id:number){
      this.photoAlbum.getPhotos(id).subscribe(x=>{ this.photos = x;console.log(x)});
  }

}
