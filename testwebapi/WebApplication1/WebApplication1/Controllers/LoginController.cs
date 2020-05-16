using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Contexts;
using System.Web.Http;
using WebApplication1.Dto;
using WebApplication1.Models;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("api/Login/user")]
        public bool UserLogin([FromBody]UserLoginDto userLogin)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    if (userLogin == null)
                    {
                        LogHelper.Error("[UserLogin]:userLogin == null");
                        return false;
                    }

                    //find user
                    var user = context.User.Where(u => u.UserName.Equals(userLogin.UserName)).FirstOrDefault() ;

                    if (user == null)
                    {
                        LogHelper.Error("[UserLogin]:user == null");
                        return false;
                    }

                    if (!user.PassWord.Equals(userLogin.PassWord))
                    {
                        LogHelper.Error("[UserLogin]:PassWord is wrong");
                        return false;
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[UserLogin]: " + ex.ToString());
                return false;
            }
        }

        [HttpPost]
        [Route("api/Login/visitor")]
        public bool VisitorLogin([FromBody]VisitorLoginDto visitorLogin)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    if (visitorLogin == null)
                    {
                        LogHelper.Error("[VisitorLogin]:userLogin == null");
                        return false;
                    }

                    //find user
                    var user = context.User.Where(u => u.UserName.Equals(visitorLogin.UserName)).FirstOrDefault();

                    if (user == null)
                    {
                        LogHelper.Error("[VisitorLogin]:userLogin == null");
                        return false;
                    }

                    if (!user.PassWord.Equals(visitorLogin.License))
                    {
                        LogHelper.Error("[VisitorLogin]:PassWord is wrong");
                        return false;
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[VisitorLogin]: " + ex.ToString());
                return false;
            }
        }

    }
}
