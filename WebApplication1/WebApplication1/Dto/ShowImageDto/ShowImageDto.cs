using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Dto.ShowImageDto
{
    public class ShowImageDto
    {
        public int ImageID { get; set; }

        public string ImagePath { get; set; }
      
        public string ImageOverview { get; set; }

        public string ImageDescription { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public static ShowImageDto Map(Image image)
        {
            if (image == null)
            {
                LogHelper.Error("[Map]:image == null");
                return null;
            }

            var showImageDto = new ShowImageDto
            {
                ImageID = image.ImageID,
                ImagePath = image.ImageSimplePath,
                ImageOverview = image.ImageOverview,
                ImageDescription = image.ImageDescription,
                Year = image.Year,
                Month = image.Month
            };

            return showImageDto;
        }
    }
}