using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class DefaultController : ApiController
    {
      

        // GET: api/Default
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Default/5
        public  List<Course> Get(int id)
        {
            try
            {
                 var de = DbConnect._context.Department.Where(d => d.DepartmentID == 1).Include(d => d.Courses).ToList();
                return de.FirstOrDefault().Courses.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // POST: api/Default
        public void Post([FromBody]string value)
        {
            try
            {

                //db.Department.Add(new Department { Name = "d1" });

                DbConnect._context.Course.Add(new Course { Name = "c1" ,DepartmentID = 1});
                DbConnect._context.Course.Add(new Course { Name = "c2", DepartmentID = 1 });

                DbConnect._context.SaveChanges();

            }
            catch (Exception)
            {

                throw;
            }
           
        }

        // PUT: api/Default/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Default/5
        public void Delete(int id)
        {
        }
    }
}
