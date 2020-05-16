using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class ImageManagementController : ApiController
    {
        // GET: api/ImageManagement
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ImageManagement/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImageManagement
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ImageManagement/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ImageManagement/5
        public void Delete(int id)
        {
        }
    }
}
