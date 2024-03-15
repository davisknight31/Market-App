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

    public string LatestQuarter { get; set; }

    public string MarketCapitalization { get; set; }

    public string EBITDA { get; set; }

    //price to earnings ratio
    public string PERatio { get; set; }
    
    //price to growth ratio
    public string PEGRatio { get; set; }

    //Book value is the value of a company's total assets minus its total liabilities. In other words, it is equal to total shareholders' equity.
    public string BookValue { get; set; }

    public string DividendPerShare { get; set; }

    public string DividendYield { get; set; }

    //earnings per share
    public string EPS { get; set; }

    public string RevenuePerShareTTM { get; set; }

    public string ProfitMargin { get; set; }

    public string OperatingMarginTTM { get; set; }

    public string ReturnOnAssetsTTM { get; set; }

    public string ReturnOnEquityTTM { get; set; }

    public string RevenueTTM { get; set; }

    public string GrossProfitTTM { get; set; }

    public string QuarterlyEarningsGrowthYOY { get; set; }

    public string QuarterlyRevenueGrowthYOY { get; set; }

    public string AnalystTargetPrice { get; set; }

    public string AnalystRatingStrongBuy { get; set; }

    public string AnalystRatingBuy { get; set; }

    public string AnalystRatingHold { get; set; }

    public string AnalystRatingSell { get; set; }

    public string AnalystRatingStrongSell { get; set; }

    //previous price to earnings ratio
    public string TrailingPE { get; set; }

    //price to earnings using forecasted earnings
    public string ForwardPE { get; set; }

    public string PriceToSalesRatioTTM { get; set; }

    public string PriceToBookRatio { get; set; }

    public string EVToRevenue { get; set; }

    public string EVToEBITDA { get; set; }

    public string Beta { get; set; }

    public string FiftyTwoWeekHigh { get; set; }

    public string FiftyTwoWeekLow { get; set; }

    public string FiftyDayMovingAverage { get; set; }

    public string TwoHundredDayMovingAverage { get; set; }

    public string SharesOutstanding { get; set; }

    public string DividendDate { get; set; }

    public string ExDividendDate { get; set; }
}