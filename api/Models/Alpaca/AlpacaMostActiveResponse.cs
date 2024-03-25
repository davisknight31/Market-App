using Newtonsoft.Json;

namespace api.Models.Alpaca;

public class AlpacaMostActiveResponse
{
    [JsonProperty("last_updated")]
    public DateTime LastUpdated { get; set; }

    [JsonProperty("most_actives")]
    public List<ActiveStock> MostActiveStocks { get; set; }
}

public class ActiveStock
{
    [JsonProperty("symbol")]
    public string Symbol { get; set; }

    [JsonProperty("trade_count")]
    public int TradeCount { get; set; }

    [JsonProperty("volume")]
    public int Volume { get; set; }
}