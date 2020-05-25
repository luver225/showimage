using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Utility
{
    public class JustToken
    {
        public static string token = "token";

        public static bool TokenCheck()
        {
            return HttpContext.Current.Request.Headers["Authorization"] == "Bearer " + token;
        }
    }
}