using ImageLine.Utility;
using ImageLine.Models;


namespace ImageLine.Dto
{
    public class ShowImageDto
    {
        public int ImageID { get; set; }

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
                ImageOverview = image.ImageOverview,
                ImageDescription = image.ImageDescription,
                Year = image.Year,
                Month = image.Month
            };

            return showImageDto;
        }
    }

    //login
    public class UserDto
    {
        public string UserName { get; set; }

        public string PassWord { get; set; }
    }

    public class LienceDto
    {

        public string UserName { get; set; }

        public string License { get; set; }
    }

    public class LoginResultDto
    {
        public int UserID { get; set; }

        public bool IsSuccess { get; set; }

        public string Reason { get; set; }

        public string Token { get; set; }

    }

    //showimage
    public class ThemeDto
    {
        public int ThemeID { get; set; }

        public int UserID { get; set; }

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

    //systemman
    public class UserChangeDto
    {
        public int UserID { get; set; }

        public string PassWord { get; set; }
    }

    public class LicenseChangeDto
    {
        public int UserID { get; set; }

        public string License { get; set; }
    }

    public class UserInfoDto
    {
        public string Name { get; set; }

        public string License { get; set; }
    }
}