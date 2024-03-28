using System.Threading.Tasks;
using api.Models;
using api.Models.Alpaca;

namespace api.Interfaces;

public interface IAlpacaService
{
    Task<AlpacaLatestBarResponse> GetLatestStockBarsBySymbols(List<string> stockSymbols);
    Task<AlpacaMostActiveResponse> GetMostActiveStocks();
    Task<AlpacaTopMoversResponse> GetTopMovers();
    Task<AlpacaLatestTradesResponse> GetLatestTrades(List<string> stockSymbols);
    Task<AlpacaNewsArticlesResponse> GetNewsArticles();
    Task<AlpacaSnapshotResponse> GetSnapshots(List<string> stockSymbols);
}