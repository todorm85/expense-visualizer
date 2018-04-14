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
            this.context.Transactions.AddRange(transactions);
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            return this.context.Transactions;
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }
    }
}
