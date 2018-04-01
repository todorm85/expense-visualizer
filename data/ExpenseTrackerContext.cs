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

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlite("Data Source=transactions.db");
        // }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tag>()
                .HasKey(t => t.Name);
            modelBuilder.Entity<Tag>()
                .HasMany(x => x.KeyPhrases);
            modelBuilder.Entity<Transaction>().HasMany(x => x.Details);
        }
    }
}