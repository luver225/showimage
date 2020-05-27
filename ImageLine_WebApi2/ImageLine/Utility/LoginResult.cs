using ImageLine.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageLine.Utility
{
    public class LoginResult
    {
        public  static LoginResultDto LoginResultInfo(bool isSuccess,string reason, string token = null, int? userID = null)
        {
            var loginResultDto = new LoginResultDto();
            loginResultDto.IsSuccess = isSuccess;
            loginResultDto.Reason = reason;
            loginResultDto.Token = token;
            //null 即为 userID == 0 
            loginResultDto.UserID = userID == null ? 0 : (int)userID;
            return loginResultDto;
        }
      
    }
}