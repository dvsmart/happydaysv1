import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album.model';
import { Observable } from 'rxjs/Observable';
import { apiurl } from '../../api-config';

@Injectable()
export class AlbumService {
  url = apiurl + 'Album';

  
  constructor(private http: HttpClient) { }

  createAlbum(album:Album) {
    return this.http.post(this.url, album);
  }
  
  getAlbums() : Observable<Album[]> {
    return this.http.get<Album[]>(this.url, {responseType: 'json'});
  }

}
