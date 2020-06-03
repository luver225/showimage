import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ShowImageDto } from 'src/app/shared/dto';
import { Service } from 'src/app/shared/service';
import {ElementRef,Renderer2} from '@angular/core';

@Component({
  selector: 'app-imageinfo',
  templateUrl: './imageinfo.component.html',
  styleUrls: ['./imageinfo.component.css']
})
export class ImageinfoComponent implements OnInit,OnChanges{

  constructor(
    private service: Service,
    private el:ElementRef,
    private renderer2: Renderer2) { }

  ngOnInit() {


  }
  isVisible = false;

  OriginalSrc;

  showModal(): void {

    this.service.DownloadOriginal(this.item.ImageID).subscribe(
      (data:Blob) =>{
        var reader = new FileReader();
        reader.onload = (event:any) => {
        this.OriginalSrc = event.target.result;
        this.isVisible = true;
        this.nzWidth = this.el.nativeElement.querySelector('.img').style.width;
       }
       reader.readAsDataURL(data);
      },
      (error:any) =>{
        alert("网络发生异常 , 请重试！");
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

  @Input() item: ShowImageDto

  @Output() deleteEvent = new EventEmitter<string>();

  simpleSrc;
  title;
  description;
  date;
  nzWidth;

  ngOnChanges() {
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
