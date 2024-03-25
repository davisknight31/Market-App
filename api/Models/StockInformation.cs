using Newtonsoft.Json;

namespace api.Models;

public class StockInformation
{
    public string Symbol { get; set; }

    public double Price { get; set; }

    public double Change { get; set; }

    public double PercentChange { get; set; }

    public double Close { get; set; }

    public double High { get; set; }

    public double Low { get; set; }

    public int Count { get; set; }

    public double Open { get; set; }

    public DateTime Time { get; set; }

    public int Volume { get; set; }

    public double VolumeWeighted { get; set; }

}