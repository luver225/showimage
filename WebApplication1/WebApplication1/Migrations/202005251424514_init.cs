namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        ImageID = c.Int(nullable: false, identity: true),
                        ImageSimplePath = c.String(maxLength: 1024, unicode: false, storeType: "nvarchar"),
                        ImageOriginalPath = c.String(maxLength: 1024, unicode: false, storeType: "nvarchar"),
                        ImageOverview = c.String(maxLength: 64, unicode: false, storeType: "nvarchar"),
                        ImageDescription = c.String(maxLength: 1024, unicode: false, storeType: "nvarchar"),
                        Year = c.Int(nullable: false),
                        Month = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        ThemeID = c.Int(nullable: false),
                        Updatetime = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.ImageID)
                .ForeignKey("dbo.Themes", t => t.ThemeID, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true);
            
            CreateTable(
                "dbo.Themes",
                c => new
                    {
                        ThemeID = c.Int(nullable: false, identity: true),
                        ThemeName = c.String(maxLength: 20, unicode: false, storeType: "nvarchar"),
                        UserID = c.Int(nullable: false),
                        Updatetime = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.ThemeID)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 20, unicode: false, storeType: "nvarchar"),
                        PassWord = c.String(maxLength: 20, unicode: false, storeType: "nvarchar"),
                        License = c.String(maxLength: 20, unicode: false, storeType: "nvarchar"),
                        Updatetime = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Themes", "UserID", "dbo.Users");
            DropForeignKey("dbo.Images", "UserID", "dbo.Users");
            DropForeignKey("dbo.Images", "ThemeID", "dbo.Themes");
            DropIndex("dbo.Themes", new[] { "UserID" });
            DropIndex("dbo.Images", new[] { "UserID" });
            DropIndex("dbo.Images", new[] { "ThemeID" });
            DropTable("dbo.Users");
            DropTable("dbo.Themes");
            DropTable("dbo.Images");
        }
    }
}
