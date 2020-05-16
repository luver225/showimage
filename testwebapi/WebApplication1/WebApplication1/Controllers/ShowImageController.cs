using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class ShowImageController : ApiController
    {
        // GET: api/ShowImage
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ShowImage/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ShowImage
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ShowImage/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShowImage/5
        public void Delete(int id)
        {
        }
    }
}
