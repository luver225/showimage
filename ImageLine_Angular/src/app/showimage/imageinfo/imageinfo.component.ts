import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ShowImageDto } from 'src/app/shared/dto';
import { Service } from 'src/app/shared/service';
import {ElementRef,Renderer2} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-imageinfo',
  templateUrl: './imageinfo.component.html',
  styleUrls: ['./imageinfo.component.css']
})
export class ImageinfoComponent implements OnInit,OnChanges{

  @Input() item: ShowImageDto

  @Input() isManagement: boolean

  @Output() deleteEvent = new EventEmitter<string>();

  simpleSrc: string;
  title: string;
  description: string;
  date: string;
  nzWidth: any;
  deleteimageVis:boolean;
  isVisible = false;
  OriginalSrc: string;
  isLoading:boolean;


  constructor(
    private service: Service,
    private el:ElementRef,
    private renderer2: Renderer2,
    private message: NzMessageService,) { 
    }

  ngOnInit() {
  }
 
  showModal(): void {
    this.isLoading = true;

    this.service.DownloadOriginal(this.item.ImageID).subscribe(
      (data:Blob) =>{
        var reader = new FileReader();
        reader.onload = (event:any) => {
        this.OriginalSrc = event.target.result;
        this.isVisible = true;
        this.nzWidth = window.innerWidth;
        this.isLoading = false;
       }
       reader.readAsDataURL(data);
      },
      (error:any) =>{
        this.message.error("网络发生异常 , 请重试！");
        this.isLoading = false;
      }
    )
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnChanges() {
    
    if(this.isManagement)
    {
      this.deleteimageVis =true;
    }
    else
    {
      this.deleteimageVis =false;
    }

    this.date = this.item.Year + "年" + this.item.Month + "月";
    this.title = this.item.ImageOverview;
    this.description = this.item.ImageDescription;

    this.service.DownloadSimple(this.item.ImageID).subscribe(
      (data:Blob) =>{
        var reader = new FileReader();
        reader.onload = (event:any) => {
        this.simpleSrc = event.target.result;
       }
       reader.readAsDataURL(data);
      }
    )
  }

  deleteimage()
  {
    this.service.DeleteImage(this.item.ImageID).subscribe(
      data => {
        if(data)
        {
          this.deleteEvent.emit("success");
        }
        else
        {
          alert("删除失败,请重试");
        } 
      },
      error =>{
        alert("网络异常,请重试");
      }
    )
  }
}
