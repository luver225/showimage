import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/service';
import { ThemeDto } from 'src/app/shared/dto';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-thememanager',
  templateUrl: './thememanager.component.html',
  styleUrls: ['./thememanager.component.css']
})
export class ThememanagerComponent implements OnInit {

  constructor(
    private service: Service,
    private message: NzMessageService
  ) { 

    
  }

  ngOnInit() {
    this.getAllTheme();
  }
  
  items = [];
  inputTheme:string;
  ImageCount:number;

  delete(any:any)
  {

    this.service.DeleteTheme(any.id).subscribe(
      data =>{
        if(data)
        {
          this.getAllTheme();
        }
        else
        {
          this.message.error("删除失败 , 请重试！");
        }
      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
    
  }

 getAllTheme()
 {
  this.items = [];
  this.service.GetThemes(parseInt(localStorage.getItem("UserId"))).subscribe(
    (data:ThemeDto[]) =>{
      if(data == null)
      {
        return;
      }
      
      data.forEach(element => {
       this.items.push({name:element.ThemeName,id:element.ThemeID,imageCount:element.ImageCount});
      })

    },
    
  );
 }

  add()
  {

    if(this.inputTheme == null || this.inputTheme == "")
    {
      this.message.error("主题未输入！");
      return;
    }


    try {
      this.items.forEach(element => {
        if (element.name == this.inputTheme) {
          this.message.error("主题名称重复，请重输！");
          throw new Error("抛出异常跳出")
        }
      });

    } catch (error) {
      return;
    }
    var themeDto =new ThemeDto();
    themeDto.ThemeName = this.inputTheme;
    themeDto.UserID = parseInt(localStorage.getItem("UserId"));
    this.service.AddTheme(themeDto).subscribe(
      data =>{
        if(data)
        {
          this.getAllTheme();
         }
      },

      (error: any) => {
        console.log(error);
        this.message.error("网络发生异常 , 请重试！");
      }

    ) 
  }

}
