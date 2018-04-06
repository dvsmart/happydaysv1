import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { apiurl } from '../../api-config';
import { Photo } from '../../core/models/photo.model';

@Injectable()
export class PhotoService {
  url = apiurl + 'Image/';
  constructor(private http: HttpClient) { }


  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url + id);
  }

    postFile(photoModel: any): Observable<boolean> {
      const endpoint = apiurl + 'imageupload';
      return this.http
        .post(endpoint, photoModel)
        .map(() => { return true; });
  }

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(apiurl + 'Image');
  }


  

}
