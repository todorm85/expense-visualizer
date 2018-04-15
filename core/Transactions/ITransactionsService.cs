using System.Collections.Generic;
using System.IO;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core.Transactions
{
    public interface ITransactionsService
    {
        void ImportTransactions(Stream fileStrem);
        void RetagAllTransactions();
    }
}