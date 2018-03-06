using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions
{
    public interface ITransactionsRepo
    {
        IEnumerable<Transaction> GetTransactions();
        void AddTransactions(IEnumerable<Transaction> transactions);
        void SaveChanges();
    }
}