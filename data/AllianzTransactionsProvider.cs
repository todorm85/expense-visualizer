using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Transactions;

namespace ExpenseTracker.Data
{
    public class AllianzTransactionsProvider : ITransactionsProvider
    {
        private const string AmountKeyName = "amount";

        private const string DatetimeKeyName = "datetime";

        private const string TransactionTypeKeyName = "dtkt";

        public List<Transaction> GetTransactions()
        {
            var parser = new XmlDocument();
            parser.Load("data.xml");
            var transactions = parser.FirstChild.ChildNodes;
            var parsedTransactions = new List<Transaction>();
            foreach (XmlNode t in transactions)
            {
                parsedTransactions.Add(this.ParseTransaction(t));
            }

            return parsedTransactions;
        }

        private Transaction ParseTransaction(XmlNode xmlTransaction)
        {
            XmlAttributeCollection xmlAttributes = xmlTransaction.Attributes;

            var transaction = new Transaction();
            foreach (XmlAttribute attribute in xmlAttributes)
            {
                if (attribute.Name == AmountKeyName)
                {
                    var style = NumberStyles.AllowDecimalPoint | NumberStyles.AllowThousands;
                    var culture = CultureInfo.InvariantCulture;
                    transaction.Amount = Decimal.Parse(xmlAttributes[AmountKeyName].Value, style, culture);
                }
                else if (attribute.Name == DatetimeKeyName)
                {
                    transaction.Date = DateTime.ParseExact(xmlAttributes[DatetimeKeyName].Value, "dd/MM/yyyy HH:mm:ss", null);
                }
                else if (attribute.Name == TransactionTypeKeyName)
                {
                    transaction.TransactionType = this.ParseTransactionType(xmlAttributes[TransactionTypeKeyName].Value);
                }
                else
                {
                    transaction.Details.Add(attribute.Name, attribute.Value);
                    transaction.Tags.UnionWith(this.tagger.GetTags(attribute.Value));
                }
            }

            return transaction;
        }

        private TransactionType ParseTransactionType(string value)
        {
            switch (value)
            {
                case "D":
                    return TransactionType.Debit;
                case "K":
                    return TransactionType.Credit;
                default:
                    throw new FormatException("Unknown transaction type format.");
            }
        }
    }
}