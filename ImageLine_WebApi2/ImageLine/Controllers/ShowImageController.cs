using ImageLine.Dto;
using ImageLine.Models;
using ImageLine.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using static ImageLine.Utility.ImageManager;

namespace ImageLine.Controllers
{
    public class ShowImageController : ApiController
    {
        [HttpGet]
        [Route("api/ShowImage/image/Original/{id}")]
        public HttpResponseMessage DownloadOriginal([FromUri] int id)
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

        [HttpGet]
        [Route("api/ShowImage/image/Simple/{id}")]
        public HttpResponseMessage DownloadSimple([FromUri] int id)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var filepath = context.Image.Find(id).ImageSimplePath;
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

        [HttpGet]
        [Route("api/ShowImage/theme/{userID}")]
        public List<ThemeDto> GetThemes([FromUri] int userID)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    var themeListEntity = context.Theme.Where(t => t.UserID == userID).ToList();

                    var themeLsitDto = new List<ThemeDto>();
                    foreach (var theme in themeListEntity)
                    {
                        themeLsitDto.Add(ThemeDto.Map(theme));
                    }
                    return themeLsitDto;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        [Route("api/ShowImage/images/{themeID}/{year}/{month}/{userID}")]
        public List<ShowImageDto> GetImageInfos([FromUri] int themeID, [FromUri] int year, [FromUri] int month, [FromUri] int userID)
        {
            try
            {
                if (!JustToken.TokenCheck())
                {
                    return null;
                }

                var hasTheme = themeID != 0;
                var hasYear = year != 0;
                var hasMonth = month != 0;

                using (var context = new ServiceContext())
                {
                    var imageList = new List<Image>();

                    //1
                    if (!hasTheme && !hasYear && !hasMonth)
                    {
                        LogHelper.Error("[ShowImage]:!hasTheme && !hasYear && !hasMonth");
                        imageList = null;
                    }

                    //2
                    if (hasTheme && hasYear && hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.ThemeID == themeID && t.Year == year && t.Month == month).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }

                        imageList = imageListEntity.OrderBy(i => i.Updatetime).ToList();
                    }

                    //3
                    if (hasTheme && !hasYear && !hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.ThemeID == themeID).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }

                        imageList = imageListEntity.OrderBy(i => i.Year).ThenBy(i => i.Month).ThenBy(i => i.Updatetime).ToList();
                    }

                    //4
                    if (hasTheme && !hasYear && hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.ThemeID == themeID && t.Month == month).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }
                        imageList = imageListEntity.OrderBy(i => i.Year).ThenBy(i => i.Updatetime).ToList();
                    }

                    //5
                    if (hasTheme && hasYear && !hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.ThemeID == themeID && t.Year == year).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }
                        imageList = imageListEntity.OrderBy(i => i.Month).ThenBy(i => i.Updatetime).ToList();
                    }

                    //6
                    if (!hasTheme && hasYear && hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.UserID == userID && t.Year == year && t.Month == month).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }
                        imageList = imageListEntity.OrderBy(i => i.Updatetime).ToList();
                    }

                    //7
                    if (!hasTheme && hasYear && !hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.UserID == userID && t.Year == year).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }
                        imageList = imageListEntity.OrderBy(i => i.Month).ThenBy(i => i.Updatetime).ToList();
                    }

                    //8
                    if (!hasTheme && !hasYear && hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t => t.UserID == userID && t.Month == month).ToList();

                        if (imageListEntity == null)
                        {
                            return null;
                        }
                        imageList = imageListEntity.OrderBy(i => i.Year).ThenBy(i => i.Updatetime).ToList();
                    }

                    var showImageDtoList = new List<ShowImageDto>();
                    foreach (var image in imageList)
                    {
                        showImageDtoList.Add(ShowImageDto.Map(image));
                    }
                    return showImageDtoList;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[ShowImage]:" + ex.ToString());
                return null;
            }
        }

        [HttpGet]
        [Route("api/ShowImage/test")]
        public void Test()
        {
            try
            {
                //TEST
                var theme = HttpContext.Current.Request["themeName"];

                //获得原始图和缩略图要保存的路径
                var imageOriginalPath = CreatefilePath(theme, ImageType.OriginalImage);
                var imageSimplePath = CreatefilePath(theme, ImageType.SimpleImage);

                var imageInputStream = HttpContext.Current.Request.Files["file"].InputStream;

                //保存原始图
                SaveFile(imageInputStream, imageOriginalPath);

                //保存缩略图
                CompressImage(imageOriginalPath, imageSimplePath);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
