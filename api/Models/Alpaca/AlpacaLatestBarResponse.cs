using Newtonsoft.Json;

namespace api.Models.Alpaca;


    public class AlpacaLatestBarResponse
    {
        [JsonProperty("bars")]
        public Dictionary<string, Bar> Bars { get; set; }
    }

    public class AlpacaHistoricalBarsResponse
    {
        [JsonProperty("bars")]
        public List<Bar> Bars { get; set; }

    }

    public class Bar
    {
        [JsonProperty("c")]
        public double Close { get; set; }

        [JsonProperty("h")]
        public double High { get; set; }

        [JsonProperty("l")]
        public double Low { get; set; }

        [JsonProperty("n")]
        public int Count { get; set; }

        [JsonProperty("o")]
        public double Open { get; set; }

        [JsonProperty("t")]
        public DateTime Time { get; set; }

        [JsonProperty("v")]
        public int Volume { get; set; }

        [JsonProperty("vw")]
        public double VolumeWeighted { get; set; }
    }
