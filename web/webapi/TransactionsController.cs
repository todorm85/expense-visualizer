using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Transactions;
using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class TransactionsController : Controller
    {
        private ITransactionsService source;

        public TransactionsController(ITransactionsService source)
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
