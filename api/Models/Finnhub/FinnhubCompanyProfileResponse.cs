using Newtonsoft.Json;

namespace api.Models.Finnhub;

public class FinnhubCompanyProfileResponse
{
	public string Country { get; set; }

	public string Currency { get; set; }

	public string Exchange { get; set; }

	public DateTime Ipo { get; set; }

	public long MarketCapitalization { get; set; }

	public string Name { get; set; }

	public string Phone { get; set; }

	public double ShareOutstanding { get; set; }

	public string Ticker { get; set; }

	public string WebUrl { get; set; }

	public string Logo { get; set; }

	public string FinnhubIndustry { get; set; }
}