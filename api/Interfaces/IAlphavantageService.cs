using System.Threading.Tasks;
using api.Models;
using api.Models.Alphavantage;


namespace api.Interfaces;

public interface IAlphavantageService
{
    Task<AlphavantageCompanyOverviewResponse> GetCompanyOverviewBySymbol(string stockSymbol);

}