using System.Threading.Tasks;
using api.Models;
using api.Models.Alpaca;

namespace api.Interfaces;

public interface IAlpacaService
{
    Task<AlpacaLatestBarResponse> GetLatestStockBarsBySymbols(List<string> stockSymbols);
    Task<AlpacaNewsArticlesResponse> GetNewsArticles();
}