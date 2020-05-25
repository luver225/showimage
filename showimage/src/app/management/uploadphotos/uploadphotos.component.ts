import { Component, OnInit } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { Service } from 'src/app/shared/service';


@Component({
  selector: 'app-uploadphotos',
  templateUrl: './uploadphotos.component.html',
  styleUrls: ['./uploadphotos.component.css']
})
export class UploadphotosComponent implements OnInit {

  constructor(
    private service:Service,
  ) { 
   
  }

  ImageTime: Date;
  ImageOverview: string;
  ThemeName: string;
  ImageDescription: string;
 
  needimgVisibility:boolean;
  src:string;
  selectFile:File;
  
  ngOnInit() {

  }

  FileSelected(event)
  {
    this.selectFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) => {
    this.src = event.target.result;
    }
    reader.readAsDataURL(this.selectFile);
    this.needimgVisibility = true;
  }


    upload()
  {
    const formdata = new FormData();

    formdata.append("file",this.selectFile,this.selectFile.name)
    formdata.append("imageyear",this.ImageTime.getFullYear().toString());
    formdata.append("imageMonth",this.ImageTime.getMonth().toString());
    formdata.append("imageOverview",this.ImageOverview)
    formdata.append("themeName",this.ThemeName);
    formdata.append("imageDescription",this.ImageDescription);

    this.service.UploadImage(formdata).subscribe(
      (data :boolean) =>{
        if(data)
        {
          alert("uploadsuccess");
        }
      }
    )
    
  }


  download()
  { 

    //  this.http.get("http://localhost:25169/api/Default/download",{responseType: 'blob'}).subscribe(
    //   data =>{
    //     var reader = new FileReader();
    //     reader.onload = (event:any) => {
    //     this.srcoverview = event.target.result;
    //     }
    //     reader.readAsDataURL(data);
    //    }
    //  );
  }

 
}
