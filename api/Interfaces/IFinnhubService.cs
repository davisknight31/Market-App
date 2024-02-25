using System.Threading.Tasks;
using api.Models;
using api.Models.Finnhub;

namespace api.Interfaces;

public interface IFinnhubService
{
    Task<StockQuote> GetStockQuoteBySymbol(string stockSymbol);

}