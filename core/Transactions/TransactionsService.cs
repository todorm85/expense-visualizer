using System.Collections.Generic;
using System.Linq;
using ExpenseTracker.Core.Tags;

namespace ExpenseTracker.Core.Transactions
{
    public class TransactionsService : ITransactionsService
    {
        private ITransactionsProvider source;
        private Tagger tagger;

        public TransactionsService(ITransactionsProvider source, Tagger tagger)
        {
            this.source = source;
            this.tagger = tagger;
        }

        public IEnumerable<Transaction> GetTransactions()
        {
            var transactions = this.source.GetTransactions();
            transactions.ForEach(t =>
            {
                foreach (var item in t.Details)
                {
                    var tags = this.tagger.GetTags(item.Value);
                    t.Tags.Concat(tags);
                }
            });

            return transactions;
        }
    }
}