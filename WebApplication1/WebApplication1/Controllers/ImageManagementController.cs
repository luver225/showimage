using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication1.Utility;
using static WebApplication1.Utility.ImageManager;

namespace WebApplication1.Controllers
{
    public class ImageManagementController : ApiController
    {
        [HttpPost]
        [Route("api/ImageManagement/image")]
        public bool Upload()
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var user = new Image();

                    var theme = HttpContext.Current.Request["themeName"];
                     theme = "testTheme";
                    var imageOriginalPath = ImageManager.CreatefilePath(theme, ImageType.OriginalImage);
                    var imageInputStream = HttpContext.Current.Request.Files["file"].InputStream;
                    ImageManager.SaveFile(imageInputStream, imageOriginalPath);

                    user.ImageOriginalPath = imageOriginalPath;
                    user.ThemeID = 1;
                    user.UserID = 1;
                    user.ImageDescription = HttpContext.Current.Request["imageDescription"];
                    user.ImageOverview = HttpContext.Current.Request["imageOverview"];
                    user.Month = int.Parse(HttpContext.Current.Request["imageMonth"]);
                    user.Year = int.Parse(HttpContext.Current.Request["imageyear"]);
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


        [HttpGet]
        [Route("api/ImageManagement/image/{id}")]
        public HttpResponseMessage Download([FromUri] int id)
        {

            try
            {
                using (var context = new ServiceContext())
                {
                    var filepath = context.Image.Find(id).ImageOriginalPath;
                    var fileStream = ImageManager.LoadFile(filepath);
                    HttpResponseMessage httpResponse = new HttpResponseMessage(HttpStatusCode.OK);
                    httpResponse.Content = new StreamContent(fileStream);
                    httpResponse.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
                    return httpResponse;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
           
        }
    }
}
