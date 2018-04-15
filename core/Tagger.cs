using System;
using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Core.Tags.Model;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Core.Transactions.Model;
namespace ExpenseTracker.Core
{
    public class Tagger
    {
        private IGenericRepo<Tag> tagsRepo;

        public Tagger(IGenericRepo<Tag> tagsRepo)
        {
            this.tagsRepo = tagsRepo;
        }

        public void TagTransactions(IEnumerable<Transaction> transactions)
        {
            foreach (var transaction in transactions)
            {
                var allTags = this.tagsRepo.Get();
                foreach (var tag in allTags)
                {
                    var tagWasMatched = false;
                    foreach (var keyPhrase in tag.KeyPhrases)
                    {
                        if (transaction.Details.Contains(keyPhrase.Value))
                        {
                            transaction.Tag = tag;
                            tagWasMatched = true;
                            break;
                        }
                    }

                    if (tagWasMatched)
                    {
                        break;
                    }
                }
            }
        }
    }
}