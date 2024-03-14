using api.Interfaces;
using api.Models;
using api.Models.Finnhub;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;



namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StocksController : Controller
{
    private readonly IFinnhubService _finnhubService;

    public StocksController(IFinnhubService finnhubService)
    {
        _finnhubService = finnhubService;
    }

    [HttpGet("GetStockQuote/{symbol}")]
    public async Task<ActionResult> GetStockQuoteBySymbol(string symbol)
    {
        //will want to make a builder that builds all requested quotes that user chooses
        try
        {
            var retrievedStockQuote = await _finnhubService.GetStockQuoteBySymbol(symbol);

            var formattedQuote = BuildQuote(retrievedStockQuote);

            return Ok(formattedQuote);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    private StockQuote BuildQuote(FinnhubStockQuoteResponse retrievedStockQuote)
    {
        var quote = new StockQuote
        {
            CurrentPrice = "$" + retrievedStockQuote.CurrentPrice.ToString("N2"),
            Change = retrievedStockQuote.Change.ToString("N2"),
            PercentChange = retrievedStockQuote.PercentChange.ToString("N2") + "%",
            HighPriceOfDay = "$" + retrievedStockQuote.HighPriceOfDay.ToString("N2"),
            LowPriceOfDay = "$" + retrievedStockQuote.LowPriceOfDay.ToString("N2"),
            OpenPriceOfDay = "$" + retrievedStockQuote.OpenPriceOfDay.ToString("N2"),
            PreviousClosePrice = "$" + retrievedStockQuote.PreviousClosePrice.ToString("N2")
        };
        return quote;
    }
}


