using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Dto;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    public class UserManagementController : ApiController
    {
        [HttpPut]
        [Route("api/UserManagement/user")]
        public bool UserModify([FromBody]UserManagementDto userManagement)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    if (userManagement == null)
                    {
                        LogHelper.Error("[UserModify]:userManagement == null");
                        return false;
                    }

                    //find user
                    var user = context.User.Where(u => u.UserID == userManagement.UserID).FirstOrDefault();

                    if (user == null)
                    {
                        LogHelper.Error("[UserModify]:user == null");
                        return false;
                    }

                    user.UserName = userManagement.UserName;
                    user.PassWord = userManagement.PassWord;
                    user.License = userManagement.License;
                    user.Updatetime = DateTime.Now;

                    context.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[UserModify]: " + ex.ToString());
                return false;
            }
        }
    }
}
