using System;
using System.Collections.Generic;

namespace ExpenseTracker.Core
{
    public class Transaction
    {
        public Transaction()
        {
            this.Details = new Dictionary<string,string>();
            this.Tags = new HashSet<string>();
        }
        public TransactionType TransactionType { get; set; }
        public Dictionary<string, string> Details { get; set; }
        public HashSet<string> Tags { get; set; }
        public DateTime? Date { get; set; }
        public Decimal Amount { get; set; }
    }

}