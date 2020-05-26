using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace ImageLine.Utility
{

    public class LogHelper
    {
        public static readonly ILog Log = LogManager.GetLogger("test");

        public static void Info(string info)
        {
            Log.Info(info);
        }

        public static void Error(string error)
        {
            Log.Error(error);
        }
    }
}