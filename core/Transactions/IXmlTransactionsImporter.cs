using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions
{
    public interface IXmlTransactionsImporter
    {
        IEnumerable<Transaction> GetTransactions(string filePath);        
    }
}