using System.Collections.Generic;
using ExpenseTracker.Core.Transactions;

namespace ExpenseTracker.Data
{
    public class TransactionsRepo : ITransactionsRepo
    {
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