using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ExpenseTracker.Core.Tags;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private IGenericRepo<Transaction> transactionsRepo;
        private AllianzXmlTransactionsParser parser;
        private Tagger tagger;

        public TransactionsService(
            IGenericRepo<Transaction> transactionsRepo,
            AllianzXmlTransactionsParser parser,
            Tagger tagger)
        {
            this.transactionsRepo = transactionsRepo;
            this.parser = parser;
            this.tagger = tagger;
        }

        public void ImportTransactions(Stream fileStrem)
        {
            var newTransactions = this.parser.GetTransactions(fileStrem).ToList();
            var existingTransactions = this.transactionsRepo.Get();
            foreach (var existingTransaction in existingTransactions)
            {
                var duplicate = newTransactions.Find(t => this.CompareTransactions(t, existingTransaction));
                if (duplicate != null)
                {
                    newTransactions.Remove(duplicate);
                }
            }

            if (newTransactions.Count > 0)
            {
                this.tagger.TagTransactions(newTransactions);
                this.transactionsRepo.Add(newTransactions);
                this.transactionsRepo.SaveChanges();
            }
        }

        public void RetagAllTransactions()
        {
            this.tagger.TagTransactions(this.transactionsRepo.Get());
        }

        private bool CompareTransactions(Transaction t1, Transaction t2)
        {
            return t1.Date == t2.Date && t1.Details == t2.Details;
        }

        public void SaveChanges()
        {
            this.transactionsRepo.SaveChanges();
        }
    }
}