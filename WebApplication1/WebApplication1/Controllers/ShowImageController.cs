using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication1.Dto;
using WebApplication1.Dto.ShowImageDto;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    public class ShowImageController : ApiController
    {
        [HttpGet]
        [Route("api/ShowImage/{userID}")]
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
        [Route("api/ShowImage/{themeID}/{year}/{month}/{userID}")]
        public List<ShowImageDto> GetImages([FromUri] int themeID, [FromUri] int year, [FromUri] int month, [FromUri] int userID)
        {
            try
            {
                var hasTheme = themeID != 0;
                var hasYear = year != 0;
                var hasMonth = month != 0;

                using (var context = new ServiceContext())
                {
                    var imageList = new List<Image>();

                    if (!hasTheme && !hasYear && !hasMonth)
                    {
                        LogHelper.Error("[ShowImage]:!hasTheme && !hasYear && !hasMonth");
                        imageList = null;
                    }
                    if (hasTheme && hasYear && hasMonth)
                    {

                        var imageListEntity = context.Image.Where(t =>
                            t.UserID == userID
                        && t.ThemeID == themeID
                        && t.Year == year
                        && t.Month == month).ToList();

                        if (imageListEntity == null)
                        {
                            LogHelper.Error("[ShowImage]:imageListEntity == null");
                            return null;
                        }

                        imageList = imageListEntity.OrderBy(i => i.Updatetime).ToList();
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
    }
}
