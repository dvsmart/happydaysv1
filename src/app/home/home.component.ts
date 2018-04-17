import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '700px',
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnails: false,
        preview: false,
        imagePercent :100,
        imageSwipe:true,
        imageInfinityMove:true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '400px',
        thumbnails: false,
        preview: false,
        imageSwipe:true,
        imageInfinityMove:true
      },
      // max-width 400
      {
        breakpoint: 420,
        width: '100%',
        height: '300px',
        thumbnails: false,
        preview: false,
        imageInfinityMove:true
      }
    ];
    this.loadAllImages();

  }

  loadAllImages() {
    this.galleryImages = [];
    this.homeService.getHome().subscribe(x => { this.getGalleryImages(x) });
  }

  getGalleryImages(photos) {
    if (photos.images.length > 1) {
      this.galleryImages = [
        {
          small: photos.images[0],
          medium: photos.images[0],
          big: photos.images[0]
        },
        {
          small: photos.images[1],
          medium: photos.images[1],
          big: photos.images[1]
        },
        {
          small: photos.images[2],
          medium: photos.images[2],
          big: photos.images[2]
        }
      ];
    } else {
      this.galleryImages = [
        {
          small: 'assets/images/403710456-windows-10-wallpapers.jpg',
          medium: 'assets/images/403710456-windows-10-wallpapers.jpg',
          big: 'assets/images/403710456-windows-10-wallpapers.jpg'
        },
        {
          small: 'assets/images/Free-Desktop-Disney-HD-Wallpapers.jpg',
          medium: 'assets/images/Free-Desktop-Disney-HD-Wallpapers.jpg',
          big: 'assets/images/Free-Desktop-Disney-HD-Wallpapers.jpg'
        }
      ];
    }
  }
}
