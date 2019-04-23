using DemoJqueryOOP.Controllers;
using MISA.DemoCukCuk03;
using MISA.DemoCukCuk03.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace MISA.DemoCukCuk03
{
    /// <summary>
    /// Customer Controller with Business Action
    /// Created By: NBDUONG (19/4/2019)
    /// </summary>
    public class CustomerController : ApiController
    {
        /// <summary>
        /// Call an object represents for a connection to database
        /// Using EntityFramework Code First to connect with database
        /// Created By: NBDUONG (19/4/20419)
        /// </summary>
        private TestDemoDbContext db = new TestDemoDbContext();

        // GET: api/Customer
        // Get list customers from api call
        // Created By: NBDUONG (19/4/2019)
        //[HttpGet]
        //[Route("customers")]
        //public IEnumerable<Customer> Get()
        //{
        //    List<Customer> listCustomers = db.Customers.ToList();
        //    return listCustomers;
        //}

        // GET: api/Customer/5
        // Get a customer with customerId found from api call
        // Created By: NBDUONG (19/4/2019)
        [HttpGet]
        [Route("customers/{customerId}")]
        public Customer Get(Guid customerId)
        {
            var customer = Customer.ListCustomers.Where(e => e.CustomerID == customerId).FirstOrDefault();
            return customer;
        }

        // POST: api/Customer
        // Create new customer
        // Created By: NBDUONG (19/4/2019)
        [HttpPost]
        [Route("customers/new")]
        public Customer Post([FromBody]Customer customer)
        {
            Customer customerNew = new Customer();
            customerNew.CustomerID = Guid.NewGuid();
            customerNew.Address = customer.Address;
            customerNew.CustomerCode = customer.CustomerCode;
            customerNew.Birthday = customer.Birthday;
            customerNew.CustomerName = customer.CustomerName;
            customerNew.Gender = customer.Gender;
            customerNew.Salary = customer.Salary;
            customerNew.StopFollow = customer.StopFollow;

            db.Customers.Add(customerNew);
            db.SaveChanges();
            return customerNew;
        }

        //Asynchronous function to get customers from database
        //Created By: NBDUONG (23/4/2019)
        [HttpGet]
        [Route("customers")]
        public async Task<AjaxResult> GetCustomers()
        {
            var result = new AjaxResult();
            try
            {
                //delay in 2s -> needs await :)
                await Task.Delay(2000);
                result.Data = db.Customers ;
                result.Success = true;
                result.Message = "Success";
            }
            catch (Exception e)
            {
                result.Success = false;
                result.Message = "Đã xảy ra lỗi. Vui lòng liên hệ MISA để giải quyết";
            }
            return result;
        }
    }
}
