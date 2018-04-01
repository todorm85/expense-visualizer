using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace ExpenseTracker.Core.Tags
{
    internal class TagConfigProvider
    {
        private IConfiguration config;
        public TagConfigProvider(IConfiguration config)
        {
            this.config = config;
        }
        public IEnumerable<(string tagName, IEnumerable<string> keyphrases)> GetTagConfigs()
        {
            var configs = new List<(string tagName, IEnumerable<string> keyphrases)>();
            int i = 0;
            while (this.config[GetTagNameKey(i)] != null)
            {
                var tagName = this.config[GetTagNameKey(i)];
                int j = 0;
                var keyphrases = new List<string>();
                while (this.config[GetTagKeyphraseKey(i, j)] != null)
                {
                    keyphrases.Add(this.config[GetTagKeyphraseKey(i, j)]);
                    j++;
                }

                configs.Add((tagName, keyphrases));
                i++;
            }

            return configs;
        }

        private static string GetTagKeyphraseKey(int i, int j)
        {
            return $"tags:{i}:keyphrases:{j}";
        }

        private static string GetTagNameKey(int i)
        {
            return $"tags:{i}:name";
        }
    }
}