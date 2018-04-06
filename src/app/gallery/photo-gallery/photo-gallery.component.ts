import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
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
  obj = { small: '', medium: '', big: '', description: '' };
  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) {
  }

  loadAllImages() {
    this.galleryImages = [];
    this.photoService.getAllPhotos().subscribe(x => { this.photos = x;console.log(x); this.getGalleryImages(x) });
  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(params => {
      this.albumId = +params['id'];
      this.loadImages(this.albumId);
    });
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
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
  }

  loadImages(id: number) {
    this.galleryImages = [];
    this.photoService.getPhotos(id).subscribe(x => { this.photos = x;console.log(x); this.getGalleryImages(x) });
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

  updateImages($event) {
    if ($event) {
      this.loadImages(this.albumId);
    }
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
