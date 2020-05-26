using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageLine.Dto
{
    public class LoginDto
    {
    }

    public class RegisterDto
    {
        public string UserName { get; set; }

        public string PassWord { get; set; }
    }

    public class UserLoginDto
    {
        public string UserName { get; set; }

        public string PassWord { get; set; }
    }

    public class VisitorLoginDto
    {
        public string UserName { get; set; }

        public string License { get; set; }
    }
}