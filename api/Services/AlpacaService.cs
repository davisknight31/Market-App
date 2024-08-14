using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using api.Interfaces;
using api.Models;
using api.Models.Alpaca;

namespace api.Services;

public class AlpacaService : IAlpacaService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<FinnhubService> _logger;
    private readonly string _alpacaV2Url;
    private readonly string _alpacaV1BetaUrl;
    private readonly string _apiKey;
    private readonly string _secretKey;

    private readonly JsonSerializerSettings serializerSettings = new()
    {
        NullValueHandling = NullValueHandling.Ignore
    };

    public AlpacaService(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<FinnhubService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;

        _alpacaV2Url = configuration.GetValue<string>("Alpaca:V2Url")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _alpacaV1BetaUrl = configuration.GetValue<string>("Alpaca:V1BetaUrl")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _apiKey = configuration.GetValue<string>("Alpaca:ApiKey")
            ?? throw new InvalidOperationException("API Key must be set in the configuration.");

        _secretKey = configuration.GetValue<string>("Alpaca:SecretKey")
           ?? throw new InvalidOperationException("Secret Key must be set in the configuration.");
    }

    private async Task<string> SendV2HttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_alpacaV2Url);
        client.DefaultRequestHeaders.Add("APCA-API-KEY-ID", _apiKey);
        client.DefaultRequestHeaders.Add("APCA-API-SECRET-KEY", _secretKey);

        var request = new HttpRequestMessage(method, relativeUrl) { Content = content };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        _logger.LogInformation($"Alpaca API response: {responseBody}");

        return responseBody;
    }

    private async Task<string> SendV1BetaHttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_alpacaV1BetaUrl);
        client.DefaultRequestHeaders.Add("APCA-API-KEY-ID", _apiKey);
        client.DefaultRequestHeaders.Add("APCA-API-SECRET-KEY", _secretKey);

        var request = new HttpRequestMessage(method, relativeUrl) { Content = content };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        _logger.LogInformation($"Alpaca API response: {responseBody}");

        return responseBody;
    }

    public async Task<AlpacaLatestBarResponse> GetLatestStockBarsBySymbols(List<string> stockSymbols)
    {
        try
        {

            var responseBody = await SendV2HttpRequestAsync(HttpMethod.Get, $"stocks/bars/latest?symbols={Uri.EscapeDataString(string.Join(",", stockSymbols))}");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var stockBars = JsonConvert.DeserializeObject<AlpacaLatestBarResponse>(responseBody);

            return stockBars;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<AlpacaMostActiveResponse> GetMostActiveStocks()
    {
        try
        {
            var responseBody = await SendV1BetaHttpRequestAsync(HttpMethod.Get, $"screener/stocks/most-actives?by=trades&top=30");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var mostActive = JsonConvert.DeserializeObject<AlpacaMostActiveResponse>(responseBody);

            return mostActive;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<AlpacaTopMoversResponse> GetTopMovers()
    {
        try
        {
            var responseBody = await SendV1BetaHttpRequestAsync(HttpMethod.Get, $"screener/stocks/movers?top=15");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var topMovers = JsonConvert.DeserializeObject<AlpacaTopMoversResponse>(responseBody);

            return topMovers;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<AlpacaNewsArticlesResponse> GetNewsArticles()
    {
        try
        {

            var responseBody = await SendV1BetaHttpRequestAsync(HttpMethod.Get, $"news?sort=desc");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var latestNews = JsonConvert.DeserializeObject<AlpacaNewsArticlesResponse>(responseBody);

            return latestNews;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<AlpacaLatestTradesResponse> GetLatestTrades(List<string> stockSymbols)
    {
        try
        {

            var responseBody = await SendV2HttpRequestAsync(HttpMethod.Get, $"stocks/trades/latest?symbols={Uri.EscapeDataString(string.Join(",", stockSymbols))}&feed=iex");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var latestTrades = JsonConvert.DeserializeObject<AlpacaLatestTradesResponse>(responseBody);

            return latestTrades;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<Dictionary<string, Snapshot>> GetSnapshots(List<string> stockSymbols)
    {
        try
        {

            var responseBody = await SendV2HttpRequestAsync(HttpMethod.Get, $"stocks/snapshots?symbols={Uri.EscapeDataString(string.Join(",", stockSymbols))}&feed=iex");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            if (string.IsNullOrEmpty(responseBody))
            {
                _logger.LogWarning($"Alpaca API response body is null or empty.");
                return null;
            }

            var snapshots = JsonConvert.DeserializeObject<Dictionary<string, Snapshot>>(responseBody);

            //if (snapshots.Stocks == null)
            //{
            //    _logger.LogWarning($"Deserialized snapshots object is null. {snapshots}");
            //    return null;
            //}

            return snapshots;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }

    public async Task<AlpacaHistoricalBarsResponse> GetHistoricalBars(string symbol)
    {
        try
        {
            //var responseBody = await SendV2HttpRequestAsync(HttpMethod.Get, $"stocks/snapshots?symbols={Uri.EscapeDataString(string.Join(",", stockSymbols))}&feed=iex");

            //?timeframe=1Day&start=2022-01-03T00%3A00%3A00Z&end=2022-05-04T00%3A00%3A00Z&limit=1000&adjustment=raw&feed=sip&sort=asc'

            string timeframe = "1Day";
            string start = DateTime.UtcNow.AddYears(-2).ToString("yyyy-MM-ddTHH:mm:ssZ");
            string end = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            //52 week response
            var responseBody = await SendV2HttpRequestAsync(HttpMethod.Get, $"stocks/{symbol}/bars?timeframe={timeframe}&start={start}&end={end}&limit=1000&adjustment=raw&feed=iex&sort=asc");

            _logger.LogInformation($"Alpaca API response: {responseBody}");

            var historicalBars = JsonConvert.DeserializeObject<AlpacaHistoricalBarsResponse>(responseBody);


            return historicalBars;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alpaca API: {httpEx.Message}");
            throw;
        }
    }
}