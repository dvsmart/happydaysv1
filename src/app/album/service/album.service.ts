import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AlbumService {
  url = environment.url + 'api/Album/';


  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createAlbum(album: Album) {
    return this.http.post(this.url, album);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url, { responseType: 'json' });
  }

  deleteAlbum(id: number) {
    return this.http.delete(this.url + id);
  }

  getDefault() {
    return this.http.get<Album>(this.url + 'default', { responseType: 'json' });
  }
}
