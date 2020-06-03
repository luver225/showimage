using ImageLine.Dto;
using ImageLine.Models;
using ImageLine.Utility;
using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using static ImageLine.Utility.LoginResult;

namespace ImageLine.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("api/Login/user")]
        public LoginResultDto UserLogin([FromBody]UserDto userLogin)
        {
            try  
            {
                using (var context = new ServiceContext())
                {
                    if (userLogin == null)
                    {
                        LogHelper.Error("[UserLogin]:userLogin == null");
                        return LoginResultInfo(false, "登陆失败");
                    }

                    var user = context.User.Where(u => u.UserName.Equals(userLogin.UserName)).FirstOrDefault();

                    if (user == null)
                    {
                        LogHelper.Error("[UserLogin]:user == null");
                        return LoginResultInfo(false, "找不到用户名");
                    }

                    if (!user.PassWord.Equals(MD5Password.Encryption(userLogin.PassWord)))
                    {
                        LogHelper.Error("[UserLogin]:PassWord is wrong");
                        return LoginResultInfo(false, "密码错误");
                    }

                    return LoginResultInfo(true, "登陆成功", JustToken.token, user.UserID);
                }

            }
            catch (Exception ex)
            {
                LogHelper.Error("[UserLogin]: " + ex.ToString());
                return LoginResultInfo(false, "登陆失败");
            }
        }

        [HttpPost]
        [Route("api/Login/visitor")]
        public LoginResultDto VisitorLogin([FromBody]LienceDto visitorLogin)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    if (visitorLogin == null)
                    {
                        LogHelper.Error("[VisitorLogin]:userLogin == null");
                        return LoginResultInfo(false, "登陆失败");
                    }

                    var user = context.User.Where(u => u.UserName.Equals(visitorLogin.UserName)).FirstOrDefault();

                    if (user == null)
                    {
                        LogHelper.Error("[VisitorLogin]:userLogin == null");
                        return LoginResultInfo(false, "找不到用户名");
                    }

                    if (user.License == null)
                    {
                        LogHelper.Error("[VisitorLogin]:License == null");
                        return LoginResultInfo(false, "该用户未授权");
                    }

                    if (user.License.Equals(visitorLogin.License) == false)
                    {
                        LogHelper.Error("[VisitorLogin]：License is wrong");
                        return LoginResultInfo(false, "授权码不正确");
                    }

                    return LoginResultInfo(true, "登陆成功", JustToken.token, user.UserID);
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[VisitorLogin]: " + ex.ToString());
                return LoginResultInfo(false, "登陆失败");
            }
        }

        [HttpPost]
        [Route("api/Login/register")]
        public string Register([FromBody]UserDto registerDto)
        {
            try
            {
                using (var context = new ServiceContext())
                {
                    if (registerDto == null)
                    {
                        LogHelper.Error("[Register]:registerDto == null");
                        return "注册失败";
                    }

                    if (string.IsNullOrEmpty(registerDto.PassWord) || string.IsNullOrEmpty(registerDto.UserName))
                    {
                        LogHelper.Error("[Register]:IsNullOrEmpty");
                        return "注册失败";
                    }

                    var userEntity = context.User.Where(u => u.UserName.Equals(registerDto.UserName)).FirstOrDefault();

                    if (userEntity != null)
                    {
                        LogHelper.Error("[Register]:IsNullOrEmpty");
                        return "该用户名已被使用,请重新输入";
                    }

                    var user = new User();
                    user.UserName = registerDto.UserName;
                    user.PassWord = MD5Password.Encryption(registerDto.PassWord);
                    user.Updatetime = DateTime.Now;
                    context.User.Add(user);
                    context.SaveChanges();
                    return "注册成功";
                }
            }
            catch (Exception ex)
            {
                LogHelper.Error("[Register]: " + ex.ToString());
                return "注册失败";
            }
        }
    }
}
