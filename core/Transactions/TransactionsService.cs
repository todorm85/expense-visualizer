using System;
using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Core.Tags;

namespace ExpenseTracker.Core.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private ITransactionsRepo repo;
        private Tagger tagger;
        private IXmlTransactionsImporter importer;

        public TransactionsService(ITransactionsRepo source, Tagger tagger, IXmlTransactionsImporter importer)
        {
            this.repo = source;
            this.tagger = tagger;
            this.importer = importer;
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            var transactions = this.repo.GetTransactions();
            foreach (var t in transactions)
            {
                foreach (var d in t.Details)
                {
                    var tags = this.tagger.GetTags(d.Value);
                    t.Tags.UnionWith(tags);
                }
            }

            return transactions;
        }

        public void ImportTransactions(string sourcePath)
        {
            var transactions = this.importer.GetTransactions(sourcePath);
            this.repo.AddTransactions(transactions);
            this.repo.SaveChanges();
        }
    }
}