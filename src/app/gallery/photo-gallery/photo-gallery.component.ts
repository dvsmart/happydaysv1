import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOrder } from 'ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../shared/services/photo.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photos: Photo[];
  albumId: number;
  paramsSub: any;
  message: string;
  hasPhotos: boolean;
  obj = { small: '', medium: '', big: '', description: '' };
  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) {
  }
 

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.albumId = +params['id'];
      this.loadImages(this.albumId);
    });
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Zoom,
        imageDescription: true,
        imageSwipe: true,
        imageInfinityMove: true,
        imageArrows: true,
        imageArrowsAutoHide: true,
        previewAnimation: true,
        lazyLoading: true,
        image: false,
        thumbnailsArrowsAutoHide: true,
        previewFullscreen: true,
        thumbnailMargin: 2,
        thumbnailsMargin: 2,
        layout: "thumbnails-top",
        thumbnailsRows: 2,
        thumbnailsOrder: NgxGalleryOrder.Row

      },
      // max-width 400
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 559,
        preview: true,
        width: '100%',
        imageSwipe: true,
        thumbnailsColumns: 1,
        thumbnails: true
      }
    ];
  }

  loadImages(id: number) {
    this.galleryImages = [];
    this.photoService.getPhotos(id).subscribe(x => { this.getGalleryImages(x) });
  }
  getGalleryImages(photos) {
    if (photos != null && photos.length > 0) {
      this.message = '';
      this.hasPhotos = true;
      photos.forEach(element => {
        var imgObj = {
          small: element.secureUrl,
          medium: element.secureUrl,
          big: element.secureUrl,
          description: element.name + ' - Added by ' + element.addedBy + ' on ' + element.addedOn
        }
        this.galleryImages.push(imgObj);
      });
    } else {
      this.hasPhotos = false;
      this.message = 'No Pictures uploaded. Please upload your photos.';
    }

  }

  updateImages($event) {
    if ($event) {
      this.loadImages(this.albumId);
    }
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
