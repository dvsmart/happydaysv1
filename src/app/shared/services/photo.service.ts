import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../core/models/photo.model';
import { environment } from '../../../environments/environment';
import { apiurl } from '../../api-config';

@Injectable()
export class PhotoService {
  url = environment.url + 'api/';
  constructor(private http: HttpClient) { }


  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + 'image/' + id);
  }

    postFile(photoModel: any): Observable<boolean> {
      const endpoint = this.url + 'imageupload';
      return this.http
        .post(endpoint, photoModel)
        .map(() => { return true; });
  }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + 'Image');
  }


  

}
