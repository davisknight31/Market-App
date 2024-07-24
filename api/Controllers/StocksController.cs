using api.Interfaces;
using api.Models;
using api.Models.Finnhub;
using api.Models.Alphavantage;
using api.Models.Alpaca;
using api.Models.CompanyModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Alpaca.Markets;

using api.Data;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StocksController : Controller
{
    private readonly IFinnhubService _finnhubService;
    private readonly IAlphavantageService _alphavantageService;
    private readonly IAlpacaService _alpacaService;
    private readonly IAlethiaService _alethiaService;
    private readonly MarketAppDbContext _marketAppDbContext;


    public StocksController(IFinnhubService finnhubService, IAlphavantageService alphavantageService, IAlpacaService alpacaService, IAlethiaService alethiaService, MarketAppDbContext marketAppDbContext)
    {
        _finnhubService = finnhubService;
        _alphavantageService = alphavantageService;
        _alpacaService = alpacaService;
        _alethiaService = alethiaService;
        _marketAppDbContext = marketAppDbContext;
    }

    //[HttpGet("GetStockQuote/{symbol}")]
    //public async Task<ActionResult> GetStockQuoteBySymbol(string symbol)
    //{
    //    try
    //    {
    //        var retrievedStockQuote = await _finnhubService.GetStockQuoteBySymbol(symbol);

    //        var formattedQuote = BuildQuote(retrievedStockQuote);

    //        return Ok(formattedQuote);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest(ex.Message);
    //    }
    //}

    //[HttpGet("GetCompanyOverview/{symbol}")]
    //public async Task<ActionResult> GetCompanyOverviewBySymbol(string symbol)
    //{
    //    try
    //    {
    //        var retrievedStockQuote = await _alphavantageService.GetCompanyOverviewBySymbol(symbol);

    //        return Ok(retrievedStockQuote);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest(ex.Message);
    //    }
    //}

    [HttpGet("GetStocks")]
    public async Task<ActionResult> GetStocks([FromQuery] List<string> symbols)
    {
        try
        {
            var retrievedStockBars = await _alpacaService.GetLatestStockBarsBySymbols(symbols);

            var retrievedSnapshots = await _alpacaService.GetSnapshots(symbols);

            var formattedStockInformation = FormatStocks(retrievedStockBars, retrievedSnapshots);


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

            var retrievedSnapshots = await _alpacaService.GetSnapshots(mostActiveSymbols);

            var formattedStockInformation = FormatStocks(retrievedStockBars, retrievedSnapshots);

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

    //[HttpGet("GetLatestTrades")]
    //public async Task<ActionResult> GetLatestTrades([FromQuery] List<string> symbols)
    //{
    //    try
    //    {
    //        var retrievedTrades = await _alpacaService.GetLatestTrades(symbols);

    //        return Ok(retrievedTrades);
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest(ex.Message);
    //    }
    //}

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

    [HttpGet("GetTradesimsChoices")]
    public async Task<IActionResult> GetTradesimsChoices()
    {
        try
        {
            List<MainListStockModel> symbols = new List<MainListStockModel>();

            var retrievedList = _marketAppDbContext.tradesimschoice.ToList();

            foreach (var entry in retrievedList)
            {

                MainListStockModel formattedEntry = new MainListStockModel
                {
                    symbolid = entry.symbolid,
                    symbol = entry.symbol,
                };
                symbols.Add(formattedEntry);
            }
          
            return Ok(symbols);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }



    [HttpGet("GetCompanyDescription/{symbol}")]
    public async Task<IActionResult> GetCompanyDescription(string symbol)
    {
        //try
        //{
        var retrievedEntry = _marketAppDbContext.tradesimschoice.FirstOrDefault(s => s.symbol == symbol);

        if (retrievedEntry != null)
        {
            TradesimsChoiceModel formattedEntry = new TradesimsChoiceModel
            {
                symbolid = retrievedEntry.symbolid,
                symbol = retrievedEntry.symbol,
                description = retrievedEntry.description,
            };

            return Ok(formattedEntry);
        }
        else
        {
            return Ok();
        }

        //}
        //catch (Exception ex)
        //{
            //return StatusCode(500, "An error occurred while retrieving the description: " + ex.Message);

        //}
    }

    [HttpGet("GetHistoricalBars/{symbol}")]
    public async Task<IActionResult> GetHistoricalBars(string symbol)
    {
        try
        {
            var retrievedResponse = await _alpacaService.GetHistoricalBars(symbol);

            return Ok(retrievedResponse);

        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving the historical bars: " + ex.Message);

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

    private List<StockInformation> FormatStocks(AlpacaLatestBarResponse barsResponseInfo, Dictionary<string, Snapshot> snapshots)
    {
        List<StockInformation> stockInformation = new List<StockInformation>();

        foreach (var entry in barsResponseInfo.Bars)
        {
            var correspondingSnapshot = new Snapshot();
            foreach(var snapshot in snapshots)
            {
                if (snapshot.Key == entry.Key)
                {
                    correspondingSnapshot = snapshot.Value;
                }
            }



            StockInformation stock = new StockInformation()
            {
                Symbol = entry.Key,
                Price = correspondingSnapshot.latestTrade.p,
                Change = correspondingSnapshot.prevDailyBar.c - correspondingSnapshot.dailyBar.o,
                PercentChange = ((correspondingSnapshot.prevDailyBar.c - correspondingSnapshot.dailyBar.o) / correspondingSnapshot.dailyBar.o) * 100,
                Close = correspondingSnapshot.prevDailyBar.c,
                High = correspondingSnapshot.dailyBar.h,
                Low = correspondingSnapshot.dailyBar.l,
                Count = entry.Value.Count,
                Open = correspondingSnapshot.dailyBar.o,
                Time = correspondingSnapshot.dailyBar.t,
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


