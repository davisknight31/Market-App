using Newtonsoft.Json;

namespace api.Models.Finnhub;

public class FinnhubStockQuoteResponse
{
    [JsonProperty("c")]
    public double CurrentPrice { get; set; }

    [JsonProperty("d")]
    public double Change { get; set; }

    [JsonProperty("dp")]
    public double PercentChange { get; set; }

    [JsonProperty("h")]
    public double HighPriceOfDay { get; set; }

    [JsonProperty("l")]
    public double LowPriceOfDay { get; set; }

    [JsonProperty("o")]
    public double OpenPriceOfDay { get; set; }

    [JsonProperty("pc")]
    public double PreviousClosePrice { get; set; }
}