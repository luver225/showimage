using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace ImageLine.Utility
{
    public class ImageManager
    {
        public static string CreatefilePath(string theme, ImageType imageType)
        {
            var uploadFile = HttpContext.Current.Request.Files["file"];

            string filepath = imageType == ImageType.SimpleImage ? "E:\\轨迹相册\\缩略图\\" + theme : "E:\\轨迹相册\\原图\\" + theme;

            if (!Directory.Exists(filepath))
            {
                Directory.CreateDirectory(filepath);
            }

            string imageName = Path.GetFileNameWithoutExtension(uploadFile.FileName) + "_" + theme + "_" +  DateTime.Now.ToString("yymmssfff") + Path.GetExtension(uploadFile.FileName);

            var imagePath = filepath + "\\" + imageName;

            return imagePath;
        }

        public static void SaveFile(Stream fileStream, string filePath)
        {
            //1.
            using (var fs = new FileStream(filePath, FileMode.CreateNew))
            {
                var bytes = new byte[fileStream.Length];
                fileStream.Read(bytes, 0, (int)fileStream.Length);
                fs.Write(bytes, 0, bytes.Count());
            }
        }

        public static FileStream LoadFile(string filePath)
        {
            return new FileStream(filePath, FileMode.Open, FileAccess.Read);
        }

        public enum ImageType
        {
            OriginalImage,
            SimpleImage,
        }
    }
}