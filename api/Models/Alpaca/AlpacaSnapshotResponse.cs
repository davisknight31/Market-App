using api.Models.Alpaca;
using Newtonsoft.Json;
using System.Collections.Generic;


namespace api.Models.Alpaca;

    public class DailyBar
    {
        public double c { get; set; }
        public double h { get; set; }
        public double l { get; set; }
        public int n { get; set; }
        public double o { get; set; }
        public DateTime t { get; set; }
        public int v { get; set; }
        public double vw { get; set; }
    }

public class LatestQuote
{
    public double ap { get; set; }
    public int AS { get; set; }
    public string ax { get; set; }
    public double bp { get; set; }
    public int bs { get; set; }
    public string bx { get; set; }
    public List<string> c { get; set; }
    public DateTime t { get; set; }
    public string z { get; set; }
}

public class LatestTrade
{
    public List<string> c { get; set; }
    public long i { get; set; }
    public double p { get; set; }
    public int s { get; set; }
    public DateTime t { get; set; }
    public string x { get; set; }
    public string z { get; set; }
}

public class MinuteBar
{
    public double c { get; set; }
    public double h { get; set; }
    public double l { get; set; }
    public int n { get; set; }
    public double o { get; set; }
    public DateTime t { get; set; }
    public int v { get; set; }
    public double vw { get; set; }
}

public class PrevDailyBar
{
    public double c { get; set; }
    public double h { get; set; }
    public double l { get; set; }
    public int n { get; set; }
    public double o { get; set; }
    public DateTime t { get; set; }
    public int v { get; set; }
    public double vw { get; set; }
}

public class Snapshot
{
    public DailyBar dailyBar { get; set; }
    public LatestQuote latestQuote { get; set; }
    public LatestTrade latestTrade { get; set; }
    public MinuteBar minuteBar { get; set; }
    public PrevDailyBar prevDailyBar { get; set; }
}

public class AlpacaSnapshotResponse
{
    public Dictionary<string, Snapshot> Snapshots { get; set; }
}
