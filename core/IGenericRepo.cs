using System.Collections.Generic;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core
{
    public interface IGenericRepo<T> where T : class
    {
        IEnumerable<T> Get();
        void Add(IEnumerable<T> transactions);
        void SaveChanges();
    }
}