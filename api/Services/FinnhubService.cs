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
using api.Models.Finnhub;



namespace api.Services;

public class FinnhubService : IFinnhubService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<FinnhubService> _logger;
    private readonly string _finnhubUrl;
    private readonly string _apiKey;

    private readonly JsonSerializerSettings serializerSettings = new()
    {
        NullValueHandling = NullValueHandling.Ignore
    };

    public FinnhubService(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<FinnhubService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;

        _finnhubUrl = configuration.GetValue<string>("Finnhub:Url")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _apiKey = configuration.GetValue<string>("Finnhub:ApiKey")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");
    }

    private async Task<string> SendHttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_finnhubUrl);
        client.DefaultRequestHeaders.Add("X-Finnhub-Token", _apiKey);


        var request = new HttpRequestMessage(method, relativeUrl) { Content = content };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        _logger.LogInformation($"Finnhub API response: {responseBody}");

        return responseBody;
    }

    public async Task<FinnhubStockQuoteResponse> GetStockQuoteBySymbol(string stockSymbol) 
    {
        try
        {
            var responseBody = await SendHttpRequestAsync(HttpMethod.Get, $"quote?symbol={stockSymbol}");

            _logger.LogInformation($"Finnhub API response: {responseBody}");

            var stockQuote = JsonConvert.DeserializeObject<FinnhubStockQuoteResponse>(responseBody);

            return stockQuote;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Finnhub API: {httpEx.Message}");
            throw;
        }
    }
}