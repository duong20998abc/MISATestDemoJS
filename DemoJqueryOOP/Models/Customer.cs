using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.DemoCukCuk03.Models
{
    /// <summary>
    /// Create Customer Entity
    /// Created By : NBDUONG (19/4/2019)
    /// </summary>
    public class Customer
    {
        /// <summary>
        /// Customer Constructor
        /// Created By : NBDUONG (19/4/2019)
        /// </summary>
        public Customer()
        {
            
        }

        /// <summary>
        /// New list customer to demo and test Api with fixed data (not included in database)
        /// Created By: NBDUONG (19/4/2019)
        /// </summary>
        public static List<Customer> ListCustomers = new List<Customer>()
        {
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Văn Mạnh", Gender=0, Birthday=DateTime.Now, Salary=5000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Thị Mai", Gender=1, Birthday=DateTime.Now, Salary=6000000, Address="Bắc Giang", StopFollow=false},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Quốc Hùng", Gender=1, Birthday=DateTime.Now, Salary=7000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Bùi Hồng Quân", Gender=0, Birthday=DateTime.Now, Salary=8000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Văn Tuấn", Gender=1, Birthday=DateTime.Now, Salary=5000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Minh Cường", Gender=1, Birthday=DateTime.Now, Salary=12000000, Address="Bắc Giang", StopFollow=false},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Hoàng Hải Đăng", Gender=1, Birthday=DateTime.Now, Salary=5000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Trần Thị Thơm", Gender=0, Birthday=DateTime.Now, Salary=15000000, Address="Bắc Giang", StopFollow=true},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Nguyễn Trường Giang", Gender=1, Birthday=DateTime.Now, Salary=5000000, Address="Bắc Giang", StopFollow=false},
            new Customer{CustomerID=Guid.NewGuid(), CustomerCode="KH001", CustomerName="Long Văn Lanh", Gender=0, Birthday=DateTime.Now, Salary=5000000, Address="Bắc Giang", StopFollow=true}
        };

        /// <summary>
        /// Customer Attributes
        /// Created By: NBDUONG (19/4/2019)
        /// </summary>
        private Guid _customerID;

        public Guid CustomerID
        {
            get { return _customerID; }
            set { _customerID = value; }
        }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        private int _gender;
        public int Gender
        {
            get
            {
                return _gender;
            }
            set
            {
                _gender = value;
                switch (value)
                {
                    case 0:
                        GenderName = "Nữ";
                        break;
                    case 1:
                        GenderName = "Nam";
                        break;
                    default:
                        GenderName = "Không xác định";
                        break;
                }
            }
        }

        public string GenderName;
        public string Address { get; set; }
        public DateTime? Birthday { get; set; }
        public decimal Salary { get; set; }
        public bool StopFollow { get; set; }
    }
}