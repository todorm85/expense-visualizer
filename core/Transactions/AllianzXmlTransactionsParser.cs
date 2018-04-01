using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml;
using ExpenseTracker.Core;
using ExpenseTracker.Core.Transactions;
using ExpenseTracker.Core.Transactions.Model;

namespace ExpenseTracker.Core.Transactions
{
    public class AllianzXmlTransactionsParser
    {
        private const string AmountKeyName = "amount";

        private const string DatetimeKeyName = "datetime";

        private const string TransactionTypeKeyName = "dtkt";

        public IEnumerable<Transaction> GetTransactions(string filePath = "data.xml")
        {
            var parser = new XmlDocument();
            parser.Load(filePath);
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
                    transaction.Details.Add(
                        $"{attribute.Name}{Environment.NewLine}{attribute.Value}");
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