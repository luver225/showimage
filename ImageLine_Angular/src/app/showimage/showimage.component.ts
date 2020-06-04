import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Service } from '../shared/service';
import { Router,  } from '@angular/router';
import { ThemeDto, ShowImageDto } from '../shared/dto';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css']
})
export class ShowimageComponent implements OnInit {

  @Input() isManagement: boolean;

  isManagementToinfo:boolean;

  testSrc:string;
  constructor(private service: Service,
    private message: NzMessageService,
    private route: Router,) { 

    if(localStorage.getItem("IsLoginSuccess") != "true")
    {
      this.route.navigate(['/loginfail']);
    }
    }
    
    ngOnInit() {
      this.srcList = [];
      this.themeList = [];
      this.carouselVis = true;
      this.hasimage = false;

      if(localStorage.getItem("IsUser") == "true" && !this.isManagement)
      {
        this.isUser = true;
      }
      else
      {
        this.isUser = false;
      }
      

      for(let i = 1 ; i < 13 ; i++)
      {
        this.monthList.push({name:i+"月",value:i })
      }

      this.service.GetThemes(parseInt(localStorage.getItem("UserId"))).subscribe(
        (data: ThemeDto[]) => {
          if (data == null) {
            return;
          }
          data.forEach(element => {
            this.themeList.push({ name: element.ThemeName, id: element.ThemeID });
          });

          //4 image
          this.service.Getimages(parseInt(localStorage.getItem("UserId"))).subscribe(
            (data: number[]) => {

              if (data == null) {
                return;
              }

              if(data.length == 0)
              {
                this.hasimage = false;
                return;
              }

              this.hasimage = true;

              console.log(data);
              data.forEach(element => {
                this.service.DownloadOriginal(element).subscribe(
                  (data: Blob) => {
                    var reader = new FileReader();
                    reader.onload = (event: any) => {
                      this.srcList.push(event.target.result);
                    }
                    reader.readAsDataURL(data);
                  }
                )
              });
            }
          )
        }
      );
    }

 carouselVis: boolean
  isUser:boolean;
  themeList = [];
  monthList = [];
  items = [];
  srcList = [];
 

  selectedTheme: { id: any; };
  selectedMonth: { value: any; };
  year;
  hasimage;

  search()
  {

    if(this.selectedTheme == null && this.year == null && this.selectedMonth == null)
    {
      this.message.info("至少选一个条件！");
      return;
    }
  

    var themeID: number;
    if(this.selectedTheme == null)
    {
      themeID = 0;
    }
    else
    {
      themeID = this.selectedTheme.id;
    }
 
    var year: number;
    if(this.year == null)
    {
      year = 0;
    }
    else
    {
       year = this.year.getFullYear();
    }

    var month: number;
    if(this.selectedMonth == null)
    {
      month = 0;
    }
    else
    {
      month = this.selectedMonth.value;
    }
  
    var UserId = parseInt(localStorage.getItem("UserId"));
    this.service.GetImageInfos(themeID,year,month,UserId).subscribe(
      (data:ShowImageDto[]) =>{

        if(data == null || data.length == 0)
        {
          this.items = [];
          this.message.info("无搜索结果！");
          return;
        }


        this.items = data;
        this.carouselVis = false;

        if(this.isManagement)
        {
          this.isManagementToinfo = true;
        }
        else
        {
          this.isManagementToinfo = false;
        }
       
      },
      (error:any) =>{
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }

  getAllTheme()
  {
   this.themeList = [];
   this.service.GetThemes(parseInt(localStorage.getItem("UserId"))).subscribe(
     (data:ThemeDto[]) =>{
       if(data == null)
       {
         return;
       }
       data.forEach(element => {
        this.themeList.push({name:element.ThemeName,id:element.ThemeID});
       })
     }
   );
  }

  deleteSuccess()
  {
    this.search();
  }

  
}
