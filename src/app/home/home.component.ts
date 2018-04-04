import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnails:false,
        preview:false,
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
        preview: false
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

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
      },
      // {
      //     small: 'assets/3-small.jpg',
      //     medium: 'assets/3-medium.jpg',
      //     big: 'assets/3-big.jpg'
      // }
    ];

  }

}
