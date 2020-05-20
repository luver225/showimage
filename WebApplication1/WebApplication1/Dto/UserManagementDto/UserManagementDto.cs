using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Dto
{
    public class UserManagementDto
    {
        public int UserID { get; set; }
        public string UserName { get; set; }

        public string PassWord { get; set; }

        public string License { get; set; }
    }
}