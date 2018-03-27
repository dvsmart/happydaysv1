import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Album } from '../album/model/album.model';
import { Photo } from './models/photo.model';
import { PhotoService } from './services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  @Input() album: Album;
  photos: Photo[];
  albumId: string;
  folderId:number;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

    obj = {small:'',medium:'',big:'', description:''};

  constructor(private photoAlbum: PhotoService,private route:ActivatedRoute) {
   }

   ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.albumId = id.toString();
    this.folderId = id;
    this.loadImages(id);
    this.galleryOptions = [
      {
          width: '100%',
          height: '700px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          imageDescription: true,
          imageSwipe :true,
          imageInfinityMove:true,
          imageArrows:true,
          imageArrowsAutoHide :true,
          previewAnimation:true,
          lazyLoading:true
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          preview :true
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [];
  }

  receiveMessage($event) {
    if($event){
      this.loadImages(this.folderId);
    }
  }

  loadImages(id:number){
      this.photoAlbum.getPhotos(id).subscribe(x=>{ this.photos = x;console.log(x); this.getGalleryImages(x)});
  }

  getGalleryImages(photos){
    photos.forEach(element => {
      console.log(element.secureUrl);
      var imgObj = {
          small: element.secureUrl,
          medium:element.secureUrl,
          big:element.secureUrl,
          description :element.name
        }
      this.galleryImages.push(imgObj);
    });
  }

}
