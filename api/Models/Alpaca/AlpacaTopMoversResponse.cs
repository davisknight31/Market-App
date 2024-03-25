using Newtonsoft.Json;

namespace api.Models.Alpaca;

public class AlpacaTopMoversResponse
{
    [JsonProperty("gainers")]
    public List<TopMoverStock> Gainers { get; set; }

    [JsonProperty("last_updated")]
    public DateTime LastUpdated { get; set; }

    [JsonProperty("losers")]
    public List<TopMoverStock> Losers { get; set; }

    [JsonProperty("market_type")]
    public string MarketType { get; set; }
}

public class TopMoverStock
{
    [JsonProperty("change")]
    public double Change { get; set; }

    [JsonProperty("percent_change")]
    public double PercentChange { get; set; }

    [JsonProperty("price")]
    public double Price { get; set; }

    [JsonProperty("symbol")]
    public string Symbol { get; set; }
}