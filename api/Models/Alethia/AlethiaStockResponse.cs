using Newtonsoft.Json;

namespace api.Models.Alethia;


public class AlethiaStockResponse
{
    public string Symbol { get; set; }

    public long AverageVolume90Day { get; set; }

    public double DayHigh { get; set; }

    public string ShortName { get; set; }

    public double Change { get; set; }

    public double PreviousClose { get; set; }

    public double Price { get; set; }

    public long Volume { get; set; }

    public double MarketCap { get; set; }

    public double ChangePercent { get; set; }

    public double DayLow { get; set; }

    public double BidPrice { get; set; }

    public int BidQuantity { get; set; }

    public double AskPrice { get; set; }

    public int AskQuantity { get; set; }

    public double YearLow { get; set; }

    public double YearHigh { get; set; }

    public double Beta { get; set; }

    public double PriceEarningsRatio { get; set; }

    public double EarningsPerShare { get; set; }

    public DateTime EarningsDate { get; set; }

    public double ForwardDividend { get; set; }

    public DateTime ExDividendDate { get; set; }

    public double YearTargetEstimate { get; set; }

    public double ForwardAnnualDividendYield { get; set; }

    public double Open { get; set; }
}