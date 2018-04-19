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
    this.loadAllImages();
  }

  createGalleryOptions(){
    this.galleryOptions = [
      {
        width: '100%',
        height: '620px',
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
        height: '700px',
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
      },
      {
        breakpoint: 380,
        width: '100%',
        height: '400px',
        thumbnails: false,
        preview: false,
        imageInfinityMove:true
      }
    ];
  }

  loadAllImages() {
    this.createGalleryOptions();
    this.galleryImages = [];
    this.homeService.getHome().subscribe(x => { this.getGalleryImages(x) });
  }

  getGalleryImages(photos) {
    if (photos.images != null && photos.images.length > 1) {
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
          small: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976288/403710395-windows-10-wallpapers_ojzpgd.png',
          medium: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976288/403710395-windows-10-wallpapers_ojzpgd.png',
          big: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976288/403710395-windows-10-wallpapers_ojzpgd.png'
        },
        {
          small: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976283/general-night-golden-gate-bridge-hd-wallpapers-golden-gate-bridge-wallpaper_zoct2w.png',
          medium: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976283/general-night-golden-gate-bridge-hd-wallpapers-golden-gate-bridge-wallpaper_zoct2w.png',
          big: 'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976283/general-night-golden-gate-bridge-hd-wallpapers-golden-gate-bridge-wallpaper_zoct2w.png'
        },
        {
          small:'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_350,w_1200/v1523976277/Free-Desktop-Disney-HD-Wallpapers_zjl4x0.png',
          medium:'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_500,w_1200/v1523976277/Free-Desktop-Disney-HD-Wallpapers_zjl4x0.png',
          big:'http://res.cloudinary.com/vjcloud/image/upload/c_scale,h_500,w_1200/v1523976277/Free-Desktop-Disney-HD-Wallpapers_zjl4x0.png'
        }
      ];
    }
  }
}
