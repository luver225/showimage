using ImageLine.Dto;
using ImageLine.Models;
using ImageLine.Utility;
using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using static ImageLine.Utility.ImageManager;

namespace ImageLine.Controllers
{
    public class SystemManagementController : ApiController
    {

        //image crud
        [HttpPost]
        [Route("api/SystemManagement/image")]
        public bool Upload()
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var image = new Image();

                    var theme = HttpContext.Current.Request["themeName"];
                    var imageOriginalPath = CreatefilePath(theme, ImageType.OriginalImage);
                    var imageInputStream = HttpContext.Current.Request.Files["file"].InputStream;
                    SaveFile(imageInputStream, imageOriginalPath);
                    image.ImageOriginalPath = imageOriginalPath;
                    image.ImageDescription = HttpContext.Current.Request["imageDescription"];
                    image.ImageOverview = HttpContext.Current.Request["imageOverview"];
                    image.Month = int.Parse(HttpContext.Current.Request["imageMonth"]);
                    image.Year = int.Parse(HttpContext.Current.Request["imageyear"]);

                    //前端Todo...
                    image.ThemeID = int.Parse(HttpContext.Current.Request["themeID"]);
                    image.UserID = int.Parse(HttpContext.Current.Request["userID"]);

                    image.Updatetime = DateTime.Now;

                    context.Image.Add(image);
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
        [Route("api/SystemManagement/image/{id}")]
        public bool DeleteImage([FromUri]int id)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var imageEntity = context.Image.Find(id);
                    var filePath = imageEntity.ImageOriginalPath;
                    context.Image.Remove(imageEntity);
                    context.SaveChanges();

                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath);
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        //user crud
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
                    userEntity.License = MD5Password.Encryption(licenseChange.License);
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

        //user crud
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
                    var themeEntity = context.Theme.Find(id);

                    var name = themeEntity.ThemeName;
                    var directoryPath_Simple = "E:\\轨迹相册\\缩略图\\" + name;
                    var directoryPath_Original = "E:\\轨迹相册\\缩略图\\" + name;

                    if (Directory.Exists(directoryPath_Simple) && File.GetAttributes(directoryPath_Simple) == FileAttributes.Directory)
                    {
                        Directory.Delete(directoryPath_Simple, true);
                    }

                    if (Directory.Exists(directoryPath_Original) && File.GetAttributes(directoryPath_Original) == FileAttributes.Directory)
                    {
                        Directory.Delete(directoryPath_Simple, true);
                    }
                    context.Theme.Remove(themeEntity);
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
