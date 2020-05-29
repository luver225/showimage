import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css']
})
export class ShowimageComponent implements OnInit {


  testSrc:string;
  constructor(private service: Service,
    private route: Router,) { 

    // if(!service.isLoginSuccess)
    // {
    //   this.route.navigate(['/loginfail']);
    // }

 

  }

  optionList = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];

  
  ngOnInit() {

  }


  download()
  {

    this.service.DownloadSimple(7).subscribe(
      (data:Blob) =>{
        var reader = new FileReader();
         reader.onload = (event:any) => {
        this.testSrc = event.target.result;
        }
        reader.readAsDataURL(data);
      }
    )
  }



}
