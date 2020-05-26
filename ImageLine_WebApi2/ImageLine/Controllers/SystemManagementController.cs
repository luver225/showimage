using ImageLine.Dto;
using ImageLine.Models;
using ImageLine.Utility;
using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using static ImageLine.Utility.ImageManager;

namespace ImageLine.Controllers
{
    public class SystemManagementController : ApiController
    {
        [HttpPost]
        [Route("api/SystemManagement/image")]
        public bool Upload()
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var user = new Image();

                    var theme = HttpContext.Current.Request["themeName"];
                    var imageOriginalPath = CreatefilePath(theme, ImageType.OriginalImage);
                    var imageInputStream = HttpContext.Current.Request.Files["file"].InputStream;
                    SaveFile(imageInputStream, imageOriginalPath);
                    user.ImageOriginalPath = imageOriginalPath;
                    user.ImageDescription = HttpContext.Current.Request["imageDescription"];
                    user.ImageOverview = HttpContext.Current.Request["imageOverview"];
                    user.Month = int.Parse(HttpContext.Current.Request["imageMonth"]);
                    user.Year = int.Parse(HttpContext.Current.Request["imageyear"]);

                    //前端Todo...
                    user.ThemeID = int.Parse(HttpContext.Current.Request["themeID"]);
                    user.UserID = int.Parse(HttpContext.Current.Request["userID"]);

                    user.Updatetime = DateTime.Now;

                    context.Image.Add(user);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPut]
        [Route("api/SystemManagement/User")]
        public bool UserChange([FromBody]UserChangeDto userDto)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var userEntity = context.User.Find(userDto.UserID);
                    userEntity.UserName = userDto.UserName;
                    userEntity.PassWord = MD5Password.Encryption(userDto.PassWord);
                    userEntity.Updatetime = DateTime.Now;
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPut]
        [Route("api/SystemManagement/license")]
        public bool LicenseChange([FromBody]LicenseChangeDto licenseChange)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var userEntity = context.User.Find(licenseChange.UserID);
                    licenseChange.License = MD5Password.Encryption(licenseChange.License);
                    userEntity.Updatetime = DateTime.Now;
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        [HttpPost]
        [Route("api/SystemManagement/theme")]
        public bool AddTheme([FromBody]ThemeDto theme)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var themeEntity = new Theme();
                    themeEntity.UserID = theme.UserID;
                    themeEntity.ThemeName = theme.ThemeName;
                    themeEntity.Updatetime = DateTime.Now;
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpDelete]
        [Route("api/SystemManagement/theme/{id}")]
        public bool DeleteTheme([FromUri]int id)
        {
            try
            {
                using (var context = new ServiceContext())
                {


                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }



    }
}
