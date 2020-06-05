using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace ImageLine.Controllers
{
    public class TestController : ApiController
    {
        [HttpGet]
        [Route("api/test/1")]
        public int Test()
        {
            try
            {
                Thread.Sleep(5000);
                return 1;
            }
            catch (Exception ex)
            {
                return 1;
            }
        }
    }
}