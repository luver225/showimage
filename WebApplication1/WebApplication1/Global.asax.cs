using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Routing;

namespace WebApplication1
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var allowOrigins = ConfigurationManager.AppSettings["cors_allowOrigins"];
            GlobalConfiguration.Configuration.EnableCors(new EnableCorsAttribute(allowOrigins, "*", "*") { SupportsCredentials = true }); ;
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }

        public override void Init()
        {
            //注册事件
            this.AuthenticateRequest += WebApiApplication_AuthenticateRequest;
            base.Init();
        }
        void WebApiApplication_AuthenticateRequest(object sender, EventArgs e)
        {
            //启用 webapi 支持session 会话
            HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
 
    }
}
