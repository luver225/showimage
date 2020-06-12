import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Service } from '../shared/service';
import { Router, } from '@angular/router';
import { ThemeDto, ShowImageDto } from '../shared/dto';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css']
})
export class ShowimageComponent implements OnInit {

  @Input() isManagement: boolean;

  themeList = [];
  monthList = [];
  imageLines = [];
  imgCarouselList = [];
  selectedTheme: { id: any; };
  selectedMonth: { value: any; };
  year:any;
  
  settingVis:boolean;
  imageLinesVis:boolean;
  carouselVis:boolean;
  carouselVis_hasImageVis:boolean;
  carouselVis_noImageVis:boolean;
  isManagementModule:boolean;
  carouselloading:boolean;


  constructor(private service: Service,
    private message: NzMessageService,
    private route: Router, ) {

    if (localStorage.getItem("IsLoginSuccess") != "true") {
      this.route.navigate(['/loginfail']);
    }

  }

  async ngOnInit() {

    this.imgCarouselList = [];
    this.themeList = [];

    this.settingVis = false;
    this.imageLinesVis = false;
    this.carouselVis = true;
    this.carouselVis_hasImageVis = true;
    this.carouselVis_noImageVis = false;

    this.isManagementModule = this.isManagement;

    if (localStorage.getItem("IsUser") == "true" && !this.isManagement) {
      this.settingVis = true;
    }
    else {
      this.settingVis = false;
    }


    for (let i = 1; i < 13; i++) {
      this.monthList.push({ name: i + "月", value: i })
    }

    await this.getAllTheme();


    if(this.isManagement)
    {
      this.carouselVis = false;
      return;
    }


  
    this.getCarouselImage();
  }


  getCarouselImage() {
    this.carouselloading = true;
    
    this.service.GetCarouselImages(parseInt(localStorage.getItem("UserId"))).subscribe(
      (data: number[]) => {

        if (data == null) {
          this.carouselVis_hasImageVis = false;
          this.carouselVis_noImageVis = true;
          return;
        }

        if (data.length == 0) {
          this.carouselVis_hasImageVis = false;
          this.carouselVis_noImageVis = true;
          return;
        }

        this.carouselVis_hasImageVis = true;
        console.log(data);
        data.forEach(element => {
          this.service.DownloadOriginal(element).subscribe(
            (data: Blob) => {
              var reader = new FileReader();
              reader.onload = (event: any) => {
                this.imgCarouselList.push(event.target.result);

                if(this.imgCarouselList.length ==4)
                {
                  this.carouselloading = false;
                }
              }
              reader.readAsDataURL(data);
            }
          )
        });
      }
    )
  }

  search() {
    if (this.selectedTheme == null
       && this.year == null
        && this.selectedMonth == null) {
      this.message.info("至少选一个条件！");
      return;
    }
    
    var themeID: number;
    if (this.selectedTheme == null) {
      themeID = 0;
    }
    else {
      themeID = this.selectedTheme.id;
    }

    var year: number;
    if (this.year == null) {
      year = 0;
    }
    else {
      year = this.year.getFullYear();
    }

    var month: number;
    if (this.selectedMonth == null) {
      month = 0;
    }
    else {
      month = this.selectedMonth.value;
    }

    var UserId = parseInt(localStorage.getItem("UserId"));
    this.service.GetImageInfos(themeID, year, month, UserId).subscribe(
      (data: ShowImageDto[]) => {

        if (data == null || data.length == 0) 
        {
          
          this.message.info("无搜索结果！");
          return;
        }

        this.imageLines = [];
        this.imageLines = data;

        this.imageLinesVis = true;
        this.carouselVis = false;

        if (this.isManagement) {
          this.isManagementModule = true;
        }
        else {
          this.isManagementModule = false;
        }

      },
      (error: any) => {
        this.message.error("网络发生异常 , 请重试！");
      }
    )
  }

   async getAllTheme() {

    this.themeList = [];

    let asyncResult = await this.service.GetThemes(parseInt(localStorage.getItem("UserId"))).toPromise();

    if (asyncResult == null) {
      return;
    }

    asyncResult.forEach(element => {
      this.themeList.push({ name: element.ThemeName, id: element.ThemeID });
    });

  }

  deleteSuccess() {
    this.search();
  }
}
