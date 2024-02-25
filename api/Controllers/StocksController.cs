using api.Interfaces;
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

            return Ok(retrievedStockQuote);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}


