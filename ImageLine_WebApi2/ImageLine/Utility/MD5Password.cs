using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageLine.Utility
{
    public class MD5Password
    {
        public static string Encryption(string password)
        {

            byte[] data = System.Text.Encoding.Unicode.GetBytes(password);
            System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] result = md5.ComputeHash(data);
            return  System.Text.Encoding.ASCII.GetString(result);
        }


    }
}