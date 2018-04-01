using System.Collections.Generic;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Data
{
    public class TransactionsRepo : ITransactionsRepo
    {
        private ExpenseTrackerContext context;

        public TransactionsRepo(ExpenseTrackerContext context)
        {
            this.context = context;
        }
        public void AddTransactions(IEnumerable<Transaction> transactions)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            throw new System.NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new System.NotImplementedException();
        }
    }
}