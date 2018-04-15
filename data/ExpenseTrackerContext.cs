using ExpenseTracker.Core.Tags.Model;
using ExpenseTracker.Core.Transactions.Model;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Data
{
    public class ExpenseTrackerContext : DbContext
    {
        public ExpenseTrackerContext(DbContextOptions<ExpenseTrackerContext> options) : base(options)
        { }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Tag> Tags { get; set; }
        public DbSet<KeyPhrase> KeyPhrases { get; set; }

    }
}