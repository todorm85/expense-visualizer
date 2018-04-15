using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Transactions;
using Microsoft.AspNetCore.Mvc;
using ExpenseTracker.Core.Transactions.Model;
using Microsoft.AspNetCore.Http;

namespace ExpenseTracker.Web.Controllers
{
    [Route("api/transactions")]
    public class TransactionsController : Controller
    {
        private ITransactionsService service;
        private IGenericRepo<Transaction> repo;

        public TransactionsController(ITransactionsService service, IGenericRepo<Transaction> repo)
        {
            this.service = service;
            this.repo = repo;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            return this.repo.Get().OrderBy(x => x.Date);
        }

        [HttpPost("import")]
        public IActionResult ImportTransactions()
        {
            var fileStream = this.Request.Form.Files[0].OpenReadStream();
            this.service.ImportTransactions(fileStream);
            return this.Ok();
        }
    }
}
