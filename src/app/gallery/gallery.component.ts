import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material';
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
  load: boolean;
  isOpened: boolean = true;
  mode: string = 'side';
  @ViewChild('sidenav') sidenav: MatSidenav;
  message: string;
  watcher: Subscription;

  constructor(private albumService: AlbumService, private router: Router, private photoService: PhotoService, media: ObservableMedia, private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.firstChild != null && this.activatedRoute.snapshot.firstChild.url[1].path != null && this.activatedRoute.snapshot.firstChild.url[1].path != undefined) {
      this.load = false;
      this.albumId = +this.activatedRoute.snapshot.firstChild.url[1].path;
    } else {
      this.albumName = 'Photos';
      this.load = true;
    }
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.isOpened = false;
        this.mode = 'push';
      }
    });
    this.albumService.getAlbums().subscribe(x => { this.albums = x; if (this.albumId != null) { this.albumName = this.albums.find(x => x.id == this.albumId).name; } });
  }

  loadAllImages() {
    this.galleryImages = [];
    this.photoService.getAllPhotos().subscribe(x => { if (x.length === 0) { this.message = 'No Pictures found' }; this.getGalleryImages(x); });
  }

  sideToggle() {
    this.sidenav.toggle();
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

  getAlbumName() {
    if (this.albumId !== null) {
      this.albumName = this.albums.find(x => x.id == this.albumId).name;
    } else {
      this.albumName = 'Photos';
    }
  }

  onSelect(id: number) {
    this.load = false;
    this.albumId = id;
    this.getAlbumName();
    this.sidenav.toggle();
  }

  configGalleryOptions(imageShow?: boolean, others?: boolean, columns?: number, rows?: number) {
    this.galleryOptions = new Array<NgxGalleryOptions>();
    this.galleryOptions = [
      {
        width: '100%',
        height: '620px',
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
      {
        breakpoint: 1920,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 10,
        thumbnailsRows: 4,
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
        breakpoint: 559,
        preview: true,
        width: '100%',
        height: '400px',
        imageSwipe: true,
        thumbnailsColumns: 2,
        thumbnailsRows: 3,
        thumbnails: true
      }
    ];
  }

  showthumbnails() {
    this.configGalleryOptions(true, true, 5, 1);
    this.loadAllImages();
  }
}
