using System.Collections.Generic;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Core.Transactions.Model;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public class GenericEntityFrameworkRepo<T> : IGenericRepo<T> where T: class
    {
        private ExpenseTrackerContext context;
        private DbSet<T> set;

        public GenericEntityFrameworkRepo(ExpenseTrackerContext context)
        {
            this.context = context;
            this.set = context.Set<T>();
        }
        
        public void Add(IEnumerable<T> transactions)
        {
            this.set.AddRange(transactions);
        }

        public IEnumerable<T> Get()
        {
            return this.set.ToListAsync().Result;
        }

        public void SaveChanges()
        {
            this.context.SaveChanges();
        }
    }
}
