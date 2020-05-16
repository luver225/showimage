using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    // SetSqlGenerator("MySql.Data.MySqlClient", new MySql.Data.Entity.MySqlMigrationSqlGenerator());
    //DbContext
    public class ServiceContext : DbContext
    {
        public ServiceContext() : base("name=DBConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<User> User { set; get; }

        public DbSet<Theme> Theme { set; get; }

        public DbSet<Image> Image { set; get; }

    }

    //User表
    public class User
    {
        // Primary key
        public int UserID { get; set; }

        [MaxLength(20)]
        public string UserName { get; set; }

        [MaxLength(20)]
        public string PassWord { get; set; }

        [MaxLength(20)]
        public string License { get; set; }

        public DateTime Updatetime { get; set; }

        // Navigation property
        public virtual ICollection<Theme> Themes { get; set; }

        // Navigation property
        public virtual ICollection<Image> Images { get; set; }
    }

    //Theme表
    public class Theme
    {
        // Primary key
        public int ThemeID { get; set; }

        [MaxLength(20)]
        public string ThemeName { get; set; }

        // Foreign key
        public int UserID { get; set; }

        public DateTime Updatetime { get; set; }


        // Navigation properties
        public virtual User User { get; set; }

        // Navigation property
        public virtual ICollection<Image> Images { get; set; }
    }


    //Image表
    public class Image
    {
        // Primary key
        public int ImageID { get; set; }

        [MaxLength(1024)]
        public string ImagePath { get; set; }

        [MaxLength(64)]
        public string ImageOverview { get; set; }

        [MaxLength(1024)]
        public string ImageDescription { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }
        
        // Foreign key
        public int UserID { get; set; }

        // Foreign key
        public int ThemeID { get; set; }

        public DateTime Updatetime { get; set; }

        // Navigation properties
        public virtual User User { get; set; }

        // Navigation properties
        public virtual Theme Theme { get; set; }
    }
}