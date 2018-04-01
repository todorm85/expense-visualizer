using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Tags;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IConfiguration config)
        {
            Configuration = config;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddEntityFrameworkSqlite()
                .AddDbContext<ExpenseTrackerContext>(builder =>
                {
                    builder.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
                });

            services.AddTransient<ITransactionsRepo, TransactionsRepo>();
            services.AddTransient<AllianzXmlTransactionsParser>();

            services.AddTransient<Tagger>();
            services.AddTransient<TagConfigProvider>();
            services.AddTransient<ITransactionsService, TransactionsService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                await next();
                if (ResourceIsNotFound(context) &&
                   IsNotFileRequest(context) &&
                   IsNotApiCall(context))
                {
                    RedirectToSPA(context);
                    await next();
                }
            });

            app.UseMvc();
            app.UseFileServer();
        }

        private static void RedirectToSPA(HttpContext context)
        {
            context.Request.Path = "/index.html";
        }

        private static bool ResourceIsNotFound(HttpContext context)
        {
            return context.Response.StatusCode == 404;
        }

        private static bool IsNotApiCall(HttpContext context)
        {
            return !context.Request.Path.Value.StartsWith("/api/");
        }

        private static bool IsNotFileRequest(HttpContext context)
        {
            return !Path.HasExtension(context.Request.Path.Value);
        }
    }
}
