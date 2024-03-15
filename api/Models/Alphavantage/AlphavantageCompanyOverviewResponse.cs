using Newtonsoft.Json;

namespace api.Models.Alphavantage;

public class AlphavantageCompanyOverviewResponse
{
    public string Symbol { get; set; }

    public string AssetType { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string CIK { get; set; }

    public string Exchange { get; set; }

    public string Currency { get; set; }

    public string Country { get; set; }

    public string Sector { get; set; }

    public string Industry { get; set; }

    public string Address { get; set; }

    public string FiscalYearEnd { get; set; }

    public DateTime LatestQuarter { get; set; }

    public long MarketCapitalization { get; set; }

    public long EBITDA { get; set; }

    //price to earnings ratio
    public double PERatio { get; set; }
    
    //price to growth ratio
    public double PEGRatio { get; set; }

    //Book value is the value of a company's total assets minus its total liabilities. In other words, it is equal to total shareholders' equity.
    public double BookValue { get; set; }

    public double DividendPerShare { get; set; }

    public double DividendYield { get; set; }

    //earnings per share
    public double EPS { get; set; }

    public double RevenuePerShareTTM { get; set; }

    public double ProfitMargin { get; set; }

    public double OperatingMarginTTM { get; set; }

    public double ReturnOnAssetsTTM { get; set; }

    public double ReturnOnEquityTTM { get; set; }

    public long RevenueTTM { get; set; }

    public long GrossProfitTTM { get; set; }

    public double QuarterlyEarningsGrowthYOY { get; set; }

    public double QuarterlyRevenueGrowthYOY { get; set; }

    public double AnalystTargetPrice { get; set; }

    public int AnalystRatingStrongBuy { get; set; }

    public int AnalystRatingBuy { get; set; }

    public int AnalystRatingHold { get; set; }

    public int AnalystRatingSell { get; set; }

    public int AnalystRatingStrongSell { get; set; }

    //previous price to earnings ratio
    public double TrailingPE { get; set; }

    //price to earnings using forecasted earnings
    public double ForwardPE { get; set; }

    public double PriceToSalesRatioTTM { get; set; }

    public double PriceToBookRatio { get; set; }

    public double EVToRevenue { get; set; }

    public double EVToEBITDA { get; set; }

    public double Beta { get; set; }

    public double FiftyTwoWeekHigh { get; set; }

    public double FiftyTwoWeekLow { get; set; }

    public double FiftyDayMovingAverage { get; set; }

    public double TwoHundredDayMovingAverage { get; set; }

    public long SharesOutstanding { get; set; }

    public DateTime DividendDate { get; set; }

    public DateTime ExDividendDate { get; set; }
}