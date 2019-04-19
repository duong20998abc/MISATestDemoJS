using Microsoft.Owin;
using MISA.DemoCukCuk03;
using Owin;
using System.Web.Http;

[assembly: OwinStartupAttribute(typeof(DemoJqueryOOP.Startup))]
namespace DemoJqueryOOP
{
    /// <summary>
    /// Start up files
    /// Created By: NBDUONG (19/4/2019)
    /// </summary>
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
