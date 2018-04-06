import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Album } from '../album/model/album.model';
import { AlbumService } from '../album/service/album.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../shared/services/photo.service';
import { NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albums: Album[];
  albumName: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  load:boolean = true;
  constructor(private albumService: AlbumService,private router:Router,private photoService:PhotoService) {
   this.albumName = 'Photos'
   this.albumService.getAlbums().subscribe(x=>{this.albums = x;});
  }

  loadAllImages() {
    this.galleryImages = [];
    this.photoService.getAllPhotos().subscribe(x => { this.getGalleryImages(x) });
  }

  getGalleryImages(photos) {
    photos.forEach(element => {
      var imgObj = {
        small: element.secureUrl,
        medium: element.secureUrl,
        big: element.secureUrl,
        description: element.name + ' - Added by ' + element.addedBy + ' on ' + element.addedOn
      }
      this.galleryImages.push(imgObj);
    });
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Zoom,
        imageDescription: true,
        imageSwipe: true,
        imageInfinityMove: true,
        imageArrows: true,
        imageArrowsAutoHide: true,
        previewAnimation: true,
        lazyLoading: true,
        image: true,
        thumbnailsArrowsAutoHide: true,
        previewFullscreen: true,
        thumbnailMargin: 2,
        thumbnailsMargin: 2,
        layout: "thumbnails-top"
      },
      // max-width 400
      {
        breakpoint: 420,
        preview: true,
        width: '100%',
        imageSize: '100%'
      }
    ];
    this.loadAllImages();
  }

  onSelect(id:number){
    this.load = false;
    this.albumName = this.albums.find(x=>x.id == id).name;
    
  }
}
