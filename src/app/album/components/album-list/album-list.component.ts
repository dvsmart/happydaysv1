import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Album } from '../../model/album.model';
import { FormControl } from '@angular/forms';
import { AlbumService } from '../../service/album.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ObservableMedia } from '@angular/flex-layout';
import { AddAlbumDialogComponent } from '../add-album-dialog/add-album-dialog.component';

import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumListComponent implements OnInit {
  albums: Album[];
  albumName: FormControl;
  albumModel: Album;
  errorMessage: string;
  cols: Observable<number>;
  defaultImg: string;
  searchText: '';
  show: boolean = true;

  loading: boolean;

  constructor(private router: Router, private albumService: AlbumService, public dialog: MatDialog, private media: ObservableMedia) {
    this.loadAll();
  }


  loadAll() {
    this.loading = true;
    this.albumService.getAlbums().subscribe(x => {
      this.albums = x;
      this.loading = false;
      if (x.length === 0) {
        this.show = false;
      } else {
        this.show = true;
      }
    });
    this.defaultImg = "http://res.cloudinary.com/vjcloud/image/upload/v1523976867/download_stt11z.png";
  }


  onLike(album: Album) {
    if (album.like === "favorite_border") {
      album.like = "favorite";
    }
  }

  deleteAlbum(album) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      hasBackdrop:false,
      data: {
        message: 'Are you sure want to delete this Album? All the images would be removed from this Album',
        title: 'Delete Confirmation',
        ok: true,
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.loading = true;
      if (result === true) {
        this.albumService.deleteAlbum(album.id).subscribe(x => { this.loadAll(); this.loading = false; });
      }
    });
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(AddAlbumDialogComponent, {
      data: { name: '' },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result === undefined) { this.loading = false; return; }
      if (this.albums.length > 15) {
        this.loading = false;
        this.errorMessage = "Maximum limit exceeded. Please contact the administrator.";
        return;
      }
      if (this.validateInput(result)) {
        var albumName = this.capitalize(result);
        this.albumName.setValue(albumName);
        this.albumModel.name = this.albumName.value;
        this.albumModel.isPublic = true;
        this.albumService.createAlbum(this.albumModel).subscribe(x => { this.loadAll(); this.loading = false; });
      } else {
        this.errorMessage = "Oops...looks like album name already exists. Please choose a different name";
        this.loading = false;
      }
    });
  }

  capitalize(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  validateInput(name: string): boolean {
    var isValid = false;
    var localAlbums = this.albums;
    var isFound = localAlbums.some(function (el) {
      return el.name === name;
    });
    if (name !== "" && name !== undefined && !isFound) {
      isValid = true;
    }
    return isValid;
  }

  ngOnInit() {
    this.updateGrid();
    this.albumName = new FormControl('');
    this.albumModel = new Album();
  }

  onSelect(album: Album) {
    this.router.navigateByUrl('Gallery/album/' + album.id);
  }

  updateGrid() {
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 3],
      ["lg", 4],
      ["xl", 5]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.media.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.media.asObservable()
      .map(change => {
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }
}
