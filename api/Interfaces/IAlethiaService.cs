using System.Threading.Tasks;
using api.Models;
using api.Models.Alethia;

namespace api.Interfaces;

public interface IAlethiaService
{
    Task<AlethiaStockResponse> GetStockDataBySymbol(string symbol);
}