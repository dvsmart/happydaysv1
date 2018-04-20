import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PhotoService } from '../../services/photo.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() albumId: string;

  private title: string;

  files: any[];
  images: File[];

  form: FormGroup;
  loading: boolean = false;
  enableUploadButton: boolean;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() notify = new EventEmitter<boolean>(false);
  uploadedImage: File;
  constructor(private fb: FormBuilder, private photoService: PhotoService, public snackBar: MatSnackBar, private ng2ImgMax: Ng2ImgMaxService) {
    this.createForm();
    this.enableUploadButton = true;
  }

  ngOnInit(): void {

  }

  openSnackBar(message: string, duration?: number, action?: string) {
    this.snackBar.open(message, action, {
      duration: duration != null ? duration : 2000, verticalPosition: 'top'
    });
  }

  createForm() {
    this.form = this.fb.group({
      content: null
    });
  }

  private prepareSave(extraData?: object): any {
    let input = new FormData();
    input.append('albumId', this.albumId);
    if (this.images != undefined && this.images.length > 0) {
      for (let index = 0; index < this.images.length; index++) {
        input.append('file', this.images[index]);
      }
    }
    return input;
  }



  onFileChange(event) {
    if (event.target.files != null && event.target.files.length > 0) {
      this.images = [];
      for (let index = 0; index < event.target.files.length; index++) {
        let image = event.target.files[index];
        this.ng2ImgMax.compressImage(image, 100).subscribe(
          result => {
            this.images.push(new File([result], result.name));
            if(this.images.length > 0 ){
              this.enableUploadButton = false;
            }
          },
          error => {
            console.log('😢 oh no..', error);
          }
        );
      }
    }
  }


  onSubmit() {
    this.openSnackBar("uploading...", 10000);
    this.loading = true;
    const formModel = this.prepareSave(this.form.value);
    this.photoService.postFile(formModel).subscribe(data => {
      this.openSnackBar("Uploaded successfully");
      this.loading = false;
      this.clear();
      this.notify.emit(true);
    }, error => {
      console.log(error.message);
      this.openSnackBar(error.message, 1500);
    });
  }

  clear() {
    this.createForm();
    this.fileInput.nativeElement.value = '';
    this.enableUploadButton = true;
  }
}
