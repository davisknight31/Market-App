using Newtonsoft.Json;

namespace api.Models.Alpaca;


public class AlpacaSnapshotResponse
{
    public Dictionary<string, StockInfo> trades { get; set; }
}

public class StockInfo
{
    public StockDailyBar DailyBar { get; set; }
    public StockLatestQuote LatestQuote { get; set; }
    public StockLatestTrade LatestTrade { get; set; }
    public StockMinuteBar MinuteBar { get; set; }
    public StockPrevDailyBar PrevDailyBar { get; set; }
}

public class StockDailyBar
{
    public double ClosePrice { get; set; }
    public double HighPrice { get; set; }
    public double LowPrice { get; set; }
    public int TradesCount { get; set; }
    public double OpenPrice { get; set; }
    public DateTime Timestamp { get; set; }
    public int Volume { get; set; }
    public double VolumeWeightedAverage { get; set; }
}

public class StockLatestQuote
{
    public double AskPrice { get; set; }
    public int AskSize { get; set; }
    public string AskExchange { get; set; }
    public double BidPrice { get; set; }
    public int BidSize { get; set; }
    public string BidExchange { get; set; }
    public List<string> Conditions { get; set; }
    public DateTime Timestamp { get; set; }
    public string QuoteType { get; set; }
}

public class StockLatestTrade
{
    public List<string> Conditions { get; set; }
    public int TradeId { get; set; }
    public double Price { get; set; }
    public int Size { get; set; }
    public DateTime Timestamp { get; set; }
    public string ExchangeId { get; set; }
    public string TradeType { get; set; }
}

public class StockMinuteBar
{
    public double ClosePrice { get; set; }
    public double HighPrice { get; set; }
    public double LowPrice { get; set; }
    public int TradesCount { get; set; }
    public double OpenPrice { get; set; }
    public DateTime Timestamp { get; set; }
    public int Volume { get; set; }
    public double VolumeWeightedAverage { get; set; }
}

public class StockPrevDailyBar
{
    public double ClosePrice { get; set; }
    public double HighPrice { get; set; }
    public double LowPrice { get; set; }
    public int TradesCount { get; set; }
    public double OpenPrice { get; set; }
    public DateTime Timestamp { get; set; }
    public int Volume { get; set; }
    public double VolumeWeightedAverage { get; set; }
}
