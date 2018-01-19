using System;
using System.Collections.Generic;

namespace ExpenseTracker.Core.Tags
{
    public class Tagger
    {
        private TagConfigProvider tagConfigProvider;

        public Tagger(TagConfigProvider provider)
        {
            this.tagConfigProvider = provider;
        }
        
        public IEnumerable<string> GetTags(string text)
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