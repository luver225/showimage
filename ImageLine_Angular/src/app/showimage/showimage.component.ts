import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Service } from '../shared/service';
import { Router,  } from '@angular/router';
import { ThemeDto, ShowImageDto } from '../shared/dto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { emptyScheduled } from 'rxjs/internal/observable/empty';




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
    private route: Router,) { 

    // if(!service.isLoginSuccess)
    // {
    //   this.route.navigate(['/loginfail']);
    // }
    }
    
    ngOnInit() {
      this.srcList = [];
      this.themeList = [];
      this.contentVis = true;

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

          this.service.Getimages(parseInt(localStorage.getItem("UserId"))).subscribe(
            (data: number[]) => {

              if (data == null) {
                return;
              }

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

  contentVis: boolean
  isUser:boolean;
  themeList = [];
  monthList = [];
  items = [];
  srcList = [];
 

  selectedTheme: { id: any; };
  selectedMonth: { value: any; };
  year;


  search()
  {
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

        if(data == null)
        {
          this.items = [];
          return;
        }
        this.items = data;

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
        alert("网络发生异常 , 请重试！");
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
