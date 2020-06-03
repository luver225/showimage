import { Component, OnInit } from '@angular/core';
import { Service } from '../shared/service';
import { Router,  } from '@angular/router';
import { ThemeDto, ShowImageDto } from '../shared/dto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




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

    ngOnInit() {
     
      if(localStorage.getItem("IsUser") == "true")
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

      this.getAllTheme();
    }


  isUser:boolean;
  themeList = [];
  monthList = [];

  items = [];
  
 

  selectedTheme;
  selectedMonth;
  year;


  search()
  {
    var themeID;
    if(this.selectedTheme == null)
    {
      themeID = 0;
    }
    else
    {
      themeID = this.selectedTheme.id;
    }
 
    var year;
    if(this.year == null)
    {
      year = 0;
    }
    else
    {
       year = this.year.getFullYear();
    }

    
    var month;
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
          return;
        }
        this.items = data;
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


  array = [1, 2, 3, 4];
}
