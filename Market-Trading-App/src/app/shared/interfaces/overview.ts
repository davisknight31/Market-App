export interface Overview {
  symbol: string;

  // The asset type of the company
  assetType: string;

  name: string;

  description: string;

  // The Central Index Key (CIK) of the company
  cik: string;

  // The exchange where the company is listed
  exchange: string;

  // The currency used by the company
  currency: string;

  // The country where the company is based
  country: string;

  // The sector to which the company belongs
  sector: string;

  // The industry to which the company belongs
  industry: string;

  // The address of the company
  address: string;

  // The fiscal year end date of the company
  fiscalYearEnd: string;

  // The latest quarter date of the company
  latestQuarter: string;

  // The market capitalization of the company
  marketCapitalization: string;

  // The Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA) of the company
  ebitda: string;

  // The Price to Earnings (PE) ratio of the company
  peRatio: string;

  // The Price to Earnings Growth (PEG) ratio of the company
  pegRatio: string;

  // The book value of the company
  bookValue: string;

  // The dividend per share of the company
  dividendPerShare: string;

  // The dividend yield of the company
  dividendYield: string;

  // The Earnings Per Share (EPS) of the company
  eps: string;

  // The Revenue Per Share (TTM) of the company
  revenuePerShareTtm: string;

  // The profit margin of the company
  profitMargin: string;

  // The operating margin (TTM) of the company
  operatingMarginTtm: string;

  // The return on assets (TTM) of the company
  returnOnAssetsTtm: string;

  // The return on equity (TTM) of the company
  returnOnEquityTtm: string;

  // The revenue (TTM) of the company
  revenueTtm: string;

  // The gross profit (TTM) of the company
  grossProfitTtm: string;

  // The quarterly earnings growth (YOY) of the company
  quarterlyEarningsGrowthYoy: string;

  // The quarterly revenue growth (YOY) of the company
  quarterlyRevenueGrowthYoy: string;

  // The analyst target price of the company
  analystTargetPrice: string;

  // The number of analysts rating the company as Strong Buy
  analystRatingStrongBuy: string;

  // The number of analysts rating the company as Buy
  analystRatingBuy: string;

  // The number of analysts rating the company as Hold
  analystRatingHold: string;

  // The number of analysts rating the company as Sell
  analystRatingSell: string;

  // The number of analysts rating the company as Strong Sell
  analystRatingStrongSell: string;

  // The Trailing Price to Earnings (PE) ratio of the company
  trailingPE: string;

  // The Forward Price to Earnings (PE) ratio of the company
  forwardPE: string;

  // The Price to Sales (TTM) ratio of the company
  priceToSalesRatioTtm: string;

  // The Price to Book ratio of the company
  priceToBookRatio: string;

  // The Enterprise Value to Revenue ratio of the company
  evToRevenue: string;

  // The Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA) ratio of the company
  evToEbitda: string;

  // The Beta value of the company
  beta: string;

  // The fifty-two week high price of the company
  fiftyTwoWeekHigh: string;

  // The fifty-two week low price of the company
  fiftyTwoWeekLow: string;

  // The fifty-day moving average price of the company
  fiftyDayMovingAverage: string;

  // The two hundred day moving average price of the company
  twoHundredDayMovingAverage: string;

  // The number of shares outstanding of the company
  sharesOutstanding: string;

  // The dividend date of the company
  dividendDate: string;

  // The ex-dividend date of the company
  exDividendDate: string;
}
