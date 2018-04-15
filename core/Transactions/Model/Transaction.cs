using System;
using System.Collections.Generic;
using ExpenseTracker.Core.Tags.Model;

namespace ExpenseTracker.Core.Transactions.Model
{
    public class Transaction
    {
        public int Id { get; set; }
        public TransactionType TransactionType { get; set; }
        public string Details { get; set; }
        public DateTime? Date { get; set; }
        public Decimal Amount { get; set; }
        public Tag Tag { get; set; }
    }
}