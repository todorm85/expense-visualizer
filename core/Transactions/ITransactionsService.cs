using System.Collections.Generic;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core.Transactions
{
    public interface ITransactionsService
    {
        IEnumerable<Transaction> GetTransactions();

        void ParseTransactions(string sourcePath);
    }
}