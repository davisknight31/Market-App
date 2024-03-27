using Newtonsoft.Json;

namespace api.Models.Alpaca;


public class AlpacaLatestTradesResponse
{
    public Dictionary<string, Trade> trades { get; set; }
}

public class Trade
{
    public List<string> c { get; set; }
    public long i { get; set; }
    public double p { get; set; }
    public int s { get; set; }
    public DateTime t { get; set; }
    public string x { get; set; }
    public string z { get; set; }
}