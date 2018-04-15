using System;
using System.Collections.Generic;

namespace ExpenseTracker.Core.Tags.Model
{
    public class Tag
    {
        public Tag()
        {
            this.KeyPhrases = new List<KeyPhrase>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public List<KeyPhrase> KeyPhrases { get; set; }
    }
}