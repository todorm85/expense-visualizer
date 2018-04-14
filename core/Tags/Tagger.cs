using System;
using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Core.Transactions.Model;
namespace ExpenseTracker.Core.Tags
{
    internal class Tagger
    {
        private TagConfigProvider tagConfigProvider;

        public Tagger(TagConfigProvider provider)
        {
            this.tagConfigProvider = provider;
        }

        public void TagTransactions(IEnumerable<Transaction> transactions)
        {
            foreach (var transaction in transactions)
            {
                var tags = this.GetTags(transaction.Details);
                foreach (var tag in tags)
                {
                    transaction.Tags.Add(new Tag() { Name = tag });
                }
            }
        }

        private IEnumerable<string> GetTags(string text)
        {
            var tags = new HashSet<string>();
            var tagConfigs = this.tagConfigProvider.GetTagConfigs();
            foreach (var tagConfig in tagConfigs)
            {
                foreach (var keyphrase in tagConfig.keyphrases)
                {
                    if (text.Contains(keyphrase))
                    {
                        tags.Add(tagConfig.tagName);
                        break;
                    }
                }
            }

            return tags;
        }

    }
}