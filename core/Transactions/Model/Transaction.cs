using System;
using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions.Model
{
    public class Transaction
    {
        public Transaction()
        {
            this.Details = new List<string>();
            this.Tags = new List<Tag>();
        }
        public int Id { get; set; }
        public TransactionType TransactionType { get; set; }
        public List<string> Details { get; set; }
        public List<Tag> Tags { get; set; }
        public DateTime? Date { get; set; }
        public Decimal Amount { get; set; }
    }
}