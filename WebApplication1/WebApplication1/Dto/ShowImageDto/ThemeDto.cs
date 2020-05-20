using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Dto.ShowImageDto
{
    public class ThemeDto
    {
        public int ThemeID { get; set; }

        public string ThemeName { get; set; }

        public static ThemeDto Map(Theme theme)
        {
            if (theme == null)
            {
                LogHelper.Error("[Map]:theme == null");
                return null;
            }

            var ThemeDto = new ThemeDto
            {
                ThemeID = theme.ThemeID,
                ThemeName = theme.ThemeName,
              
            };

            return ThemeDto;
        }
    }
}