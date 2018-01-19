using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions
{
    public interface ITransactionsService
    {
        IEnumerable<Transaction> GetTransactions();
    }
}