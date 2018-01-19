using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions
{
    public interface ITransactionsProvider
    {
        List<Transaction> GetTransactions();
    }
}