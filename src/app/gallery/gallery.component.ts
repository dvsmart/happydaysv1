import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Album } from '../album/model/album.model';
import { AlbumService } from '../album/service/album.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../shared/services/photo.service';
import { NgxGalleryOptions, NgxGalleryAnimation, NgxGalleryOrder } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albums: Album[];
  albumName: string;
  albumId: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  load: boolean = true;
  isOpened: boolean;

  watcher: Subscription;
  constructor(private albumService: AlbumService, private router: Router, private photoService: PhotoService, media: ObservableMedia, private activatedRoute: ActivatedRoute) {
    this.albumName = 'Photos'
    this.watcher = media.subscribe((change: MediaChange) => {
      this.isOpened = change.mqAlias != 'xs';
    });
    this.albumService.getAlbums().subscribe(x => { this.albums = x; });
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
    this.configGalleryOptions(false, true, 5, 4);
    this.loadAllImages();
  }

  onSelect(id: number) {
    this.load = false;
    this.albumId = id;
    this.albumName = this.albums.find(x => x.id == id).name;
  }

  configGalleryOptions(imageShow?: boolean, others?: boolean, columns?: number, rows?: number) {
    this.galleryOptions = new Array<NgxGalleryOptions>();
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: columns ? columns : 5,
        thumbnailsRows: rows ? rows : 0,
        imageAnimation: NgxGalleryAnimation.Zoom,
        thumbnailsOrder: NgxGalleryOrder.Row,
        imageDescription: others ? false : true,
        imageSwipe: others ? false : true,
        imageInfinityMove: others ? false : true,
        imageArrows: others ? false : true,
        imageArrowsAutoHide: others ? false : true,
        previewAnimation: others ? false : true,
        lazyLoading: true,
        image: imageShow,
        thumbnailsArrowsAutoHide: others ? false : true,
        previewFullscreen: others ? false : true,
        thumbnailMargin: 2,
        thumbnailsMargin: 2,
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

  showthumbnails() {
    this.configGalleryOptions(true, false, 5, 3);
    this.loadAllImages();
  }
}
