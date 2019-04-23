using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoJqueryOOP.Controllers
{
    public class AjaxResult
    {
        public Boolean Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}