using api.Interfaces;
using api.Models;
using api.Models.Finnhub;
using api.Models.Alphavantage;
using api.Models.Alpaca ;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;



namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StocksController : Controller
{
    private readonly IFinnhubService _finnhubService;
    private readonly IAlphavantageService _alphavantageService;
    private readonly IAlpacaService _alpacaService;
    private readonly IAlethiaService _alethiaService;


    public StocksController(IFinnhubService finnhubService, IAlphavantageService alphavantageService, IAlpacaService alpacaService, IAlethiaService alethiaService)
    {
        _finnhubService = finnhubService;
        _alphavantageService = alphavantageService;
        _alpacaService = alpacaService;
        _alethiaService = alethiaService;
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

    [HttpGet("GetCompanyOverview/{symbol}")]
    public async Task<ActionResult> GetCompanyOverviewBySymbol(string symbol)
    {
        try
        {
            var retrievedStockQuote = await _alphavantageService.GetCompanyOverviewBySymbol(symbol);

            return Ok(retrievedStockQuote);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetLatestBars")]
    public async Task<ActionResult> GetLatestStockBarsBySymbols([FromQuery] List<string> symbols)
    {
        try
        {
            var retrievedStockBars = await _alpacaService.GetLatestStockBarsBySymbols(symbols);

            return Ok(retrievedStockBars);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetStockData/{symbol}")]
    public async Task<ActionResult> GetStockDataBySymbol(string symbol)
    {
        try
        {
            var retrievedStockData = await _alethiaService.GetStockDataBySymbol(symbol);

            return Ok(retrievedStockData);
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
            CurrentPrice = retrievedStockQuote.CurrentPrice.ToString("N2"),
            Change = retrievedStockQuote.Change.ToString("N2"),
            PercentChange = retrievedStockQuote.PercentChange.ToString("N2"),
            HighPriceOfDay = retrievedStockQuote.HighPriceOfDay.ToString("N2"),
            LowPriceOfDay = retrievedStockQuote.LowPriceOfDay.ToString("N2"),
            OpenPriceOfDay = retrievedStockQuote.OpenPriceOfDay.ToString("N2"),
            PreviousClosePrice = retrievedStockQuote.PreviousClosePrice.ToString("N2")
        };
        return quote;
    }
}


