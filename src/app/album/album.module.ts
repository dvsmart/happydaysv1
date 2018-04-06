import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumComponent } from './components/album.component';
import { AddAlbumDialogComponent } from './components/add-album-dialog/add-album-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AlbumService } from './service/album.service';
import { SearchByNamePipe } from '../shared/pipes/search.pipe';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  entryComponents:[AddAlbumDialogComponent,DialogComponent],
  providers:[AlbumService],
  declarations: [AlbumComponent,AlbumListComponent, AddAlbumDialogComponent,SearchByNamePipe]
})
export class AlbumModule { }
