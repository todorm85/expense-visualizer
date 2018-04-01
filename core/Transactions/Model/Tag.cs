using System;
using System.Collections.Generic;

namespace ExpenseTracker.Core.Transactions.Model
{
    public class Tag
    {
        public Tag()
        {
            this.KeyPhrases = new List<string>();
        }
        public string Name { get; set; }
        public List<string> KeyPhrases {get;set;}
    }
}