using Newtonsoft.Json;

namespace api.Models;

public class StockQuote
{
    [JsonProperty("c")]
    public string CurrentPrice { get; set; }

    [JsonProperty("d")]
    public string Change { get; set; }

    [JsonProperty("dp")]
    public string PercentChange { get; set; }

    [JsonProperty("h")]
    public string HighPriceOfDay { get; set; }

    [JsonProperty("l")]
    public string LowPriceOfDay { get; set; }

    [JsonProperty("o")]
    public string OpenPriceOfDay { get; set; }

    [JsonProperty("pc")]
    public string PreviousClosePrice { get; set; }
}