/// <summary>
/// Migration to create database using Entity Framework with Code Fist
/// Created By: NBDUONG (19/4/2019)
/// </summary>

namespace DemoJqueryOOP.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aa : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerID = c.Guid(nullable: false),
                        CustomerCode = c.String(),
                        CustomerName = c.String(),
                        Gender = c.Int(nullable: false),
                        Address = c.String(),
                        Birthday = c.DateTime(),
                        Salary = c.Decimal(nullable: false, precision: 18, scale: 2),
                        StopFollow = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CustomerID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
