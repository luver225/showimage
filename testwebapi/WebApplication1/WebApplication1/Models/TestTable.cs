using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Image
    {
        // Primary key
        public int ImageID { get; set; }
        public string Theme { get; set; }
        public string ImagePath { get; set; }
        public string Description { get; set; }
        public int ImageIndex { get; set; }
        public TimeSpan Updatetime { get; set; }
        public DateTime ImgeDate { get; set; }

    }


    public class Context : DbContext
    {
        public Context(): base("name=DBConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Image> Image { set; get; }
    }

    public class DbConnect
    {
        public static Context _context = new Context();
 
    }
}