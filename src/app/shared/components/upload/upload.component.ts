import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhotoService } from '../../../photo-gallery/services/photo.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() albumId: string;

  private title: string;

  files:string[];

  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @Output() notify = new EventEmitter<boolean>(false);

  constructor(private fb: FormBuilder,private photoService: PhotoService,public snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl(''),
      content: null
    });
  }

  private prepareSave(extraData?:object): any {
    let input = new FormData();
    input.append('albumId',this.albumId);
    input.append('name',this.form.get('name').value);
    this.files = this.form.get('content').value;
    for (let index = 0; index < this.files.length; index++) {
      input.append('file', this.files[index]);
    }
    return input;
  }
 
  
  
  onFileChange(event) {
    if(event.target.files.length > 0) {
        this.form.get('content').setValue(event.target.files);
      }
    }


      onSubmit() {
        debugger;
        const formModel = this.prepareSave(this.form.value);
        this.loading = true;
        this.photoService.postFile(formModel).subscribe(data => {
            this.openSnackBar("File uploaded successfully");
            this.notify.emit(true);
            this.fileInput.nativeElement.value = "";
            this.createForm();
            this.loading = false;
            }, error => {
              console.log(error);
            });
      }
    
      clearFile() {
        this.form.get('content').setValue(null);
        this.fileInput.nativeElement.value = '';
      }
}