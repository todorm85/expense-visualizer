using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Core;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private AllianzDataSource source;

        public TransactionsController(AllianzDataSource source)
        {
            this.source = source;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return this.source.GetTransactions();
        }
    }
}
