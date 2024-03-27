using api.Interfaces;
using api.Models;
using api.Models.Finnhub;
using api.Models.Alphavantage;
using api.Models.Alpaca ;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Alpaca.Markets;

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

    [HttpGet("GetStocks")]
    public async Task<ActionResult> GetStocks([FromQuery] List<string> symbols)
    {
        try
        {
            var retrievedStockBars = await _alpacaService.GetLatestStockBarsBySymbols(symbols);

            var retrievedLatestTrades = await _alpacaService.GetLatestTrades(symbols);

            var formattedStockInformation = FormatStocks(retrievedStockBars, retrievedLatestTrades);


            return Ok(formattedStockInformation);
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

    [HttpGet("GetCompanyProfile/{symbol}")]
    public async Task<ActionResult> GetCompanyProfileBySymbol(string symbol)
    {
        try
        {
            var retrievedCompanyProfileResponse = await _finnhubService.GetCompanyProfileBySymbol(symbol);

            return Ok(retrievedCompanyProfileResponse);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetMostActive")]
    public async Task<ActionResult> GetMostActive()
    {
        try
        {
            var retrievedMostActiveStocks = await _alpacaService.GetMostActiveStocks();

            var mostActiveSymbols = GetMostActiveSymbols(retrievedMostActiveStocks);

            var retrievedStockBars = await _alpacaService.GetLatestStockBarsBySymbols(mostActiveSymbols);

            var retrievedLatestTrades = await _alpacaService.GetLatestTrades(mostActiveSymbols);

            var formattedStockInformation = FormatStocks(retrievedStockBars, retrievedLatestTrades);

            return Ok(formattedStockInformation);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetTopMovers")]
    public async Task<ActionResult> GetTopMovers()
    {
        try
        {
            var retrievedTopMovers = await _alpacaService.GetTopMovers();

            var moverSymbols = GetMoverSymbols(retrievedTopMovers);

            var retrievedStockBars = await _alpacaService.GetLatestStockBarsBySymbols(moverSymbols);

            var formattedStockInformation = FormatTopMoverInformation(retrievedTopMovers, retrievedStockBars);


            return Ok(formattedStockInformation);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetLatestTrades")]
    public async Task<ActionResult> GetLatestTrades([FromQuery] List<string> symbols)
    {
        try
        {
            var retrievedTrades = await _alpacaService.GetLatestTrades(symbols);

            return Ok(retrievedTrades);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetNewsArticles")]
    public async Task<ActionResult> GetNewsArticles()
    {
        try
        {
            var retrievedNewsArticleResponse = await _alpacaService.GetNewsArticles();

            return Ok(retrievedNewsArticleResponse);
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

    private List<string> GetMoverSymbols(AlpacaTopMoversResponse retrievedTopMovers)
    {
        List<string> moverSymbols = new List<string>();

        foreach (TopMoverStock mover in retrievedTopMovers.Gainers)
        {
            moverSymbols.Add(mover.Symbol);
        }

        foreach (TopMoverStock mover in retrievedTopMovers.Losers)
        {
            moverSymbols.Add(mover.Symbol);
        }

        return moverSymbols;
    }

    private List<string> GetMostActiveSymbols(AlpacaMostActiveResponse retrievedMostActive)
    {
        List<string> mostActiveSymbols = new List<string>();
        
        foreach (ActiveStock stock in retrievedMostActive.MostActiveStocks)
        {
            mostActiveSymbols.Add(stock.Symbol);
        }

        return mostActiveSymbols;
    }

    private List<StockInformation> FormatStocks(AlpacaLatestBarResponse barsResponseInfo, AlpacaLatestTradesResponse latestTradesResponseInfo)
    {
        List<StockInformation> stockInformation = new List<StockInformation>();

        foreach (var entry in barsResponseInfo.Bars)
        {
        
            var correspondingTrade = new Trade();
            foreach(var trade in latestTradesResponseInfo.trades)
            {
                if (trade.Key == entry.Key)
                {
                    correspondingTrade = trade.Value;
                }
            }



            StockInformation stock = new StockInformation()
            {
                Symbol = entry.Key,
                Price = correspondingTrade.p,
                Change = correspondingTrade.p - entry.Value.Open,
                PercentChange = ((correspondingTrade.p - entry.Value.Open) / entry.Value.Open) * 100,
                Close = entry.Value.Close,
                High = entry.Value.High,
                Low = entry.Value.Low,
                Count = entry.Value.Count,
                Open = entry.Value.Open,
                Time = entry.Value.Time,
                Volume = entry.Value.Volume,
                VolumeWeighted = entry.Value.VolumeWeighted
            };
            stockInformation.Add(stock);   
        }
        return stockInformation;
    }


    private List<StockInformation> FormatTopMoverInformation(AlpacaTopMoversResponse topMoversBaseInfo, AlpacaLatestBarResponse barsResponseInfo)
    {
        List<StockInformation> stockInformation = new List<StockInformation>();

        foreach (TopMoverStock mover in topMoversBaseInfo.Gainers)
        {
            var correspondingBar = new Bar();
            foreach (var entry in barsResponseInfo.Bars)
            {
                if (mover.Symbol == entry.Key)
                {
                    correspondingBar = entry.Value;
                }
            }

            StockInformation stock = new StockInformation()
            {
                Symbol = mover.Symbol,
                Price = mover.Price,
                Change = mover.Change,
                PercentChange = mover.PercentChange,
                Close = correspondingBar.Close,
                High = correspondingBar.High,
                Low = correspondingBar.Low,
                Count = correspondingBar.Count,
                Open = correspondingBar.Open,
                Time = correspondingBar.Time,
                Volume = correspondingBar.Volume,
                VolumeWeighted = correspondingBar.VolumeWeighted
            };

            stockInformation.Add(stock);
        }

        foreach (TopMoverStock mover in topMoversBaseInfo.Losers)
        {
            var correspondingBar = new Bar();
            foreach (var entry in barsResponseInfo.Bars)
            {
                if (mover.Symbol == entry.Key)
                {
                    correspondingBar = entry.Value;
                }
            }

            StockInformation stock = new StockInformation()
            {
                Symbol = mover.Symbol,
                Price = mover.Price,
                Change = mover.Change,
                PercentChange = mover.PercentChange,
                Close = correspondingBar.Close,
                High = correspondingBar.High,
                Low = correspondingBar.Low,
                Count = correspondingBar.Count,
                Open = correspondingBar.Open,
                Time = correspondingBar.Time,
                Volume = correspondingBar.Volume,
                VolumeWeighted = correspondingBar.VolumeWeighted
            };

            stockInformation.Add(stock);
        }

        return stockInformation;
    }
}


