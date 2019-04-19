using MISA.DemoCukCuk03.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MISA.DemoCukCuk03
{
    public class TestDemoDbContext : DbContext
    {
        public TestDemoDbContext() : base("TestDemoDbContext")
        {

        }

        public DbSet<Customer> Customers { get; set; }
    }
}