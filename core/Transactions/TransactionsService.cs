using System;
using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Core.Tags;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private ITransactionsRepo repo;
        private Tagger tagger;
        private AllianzXmlTransactionsParser parser;

        internal TransactionsService(ITransactionsRepo source, Tagger tagger, AllianzXmlTransactionsParser parser)
        {
            this.repo = source;
            this.tagger = tagger;
            this.parser = parser;
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            var transactions = this.repo.GetTransactions();
            return transactions;
        }

        public void ParseTransactions(string sourcePath)
        {
            var transactions = this.parser.GetTransactions(sourcePath);
            this.repo.AddTransactions(transactions);
        }

        public void TagTransactions(IEnumerable<Transaction> transactions)
        {
            this.tagger.TagTransactions(transactions);
        }

        public void SaveChanges()
        {
            this.repo.SaveChanges();
        }
    }
}