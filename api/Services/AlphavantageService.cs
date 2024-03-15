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
using api.Models.Alphavantage;

namespace api.Services;

public class AlphavantageService : IAlphavantageService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<FinnhubService> _logger;
    private readonly string _alphavantageUrl;
    private readonly string _apiKey;

    private readonly JsonSerializerSettings serializerSettings = new()
    {
        NullValueHandling = NullValueHandling.Ignore
    };

    public AlphavantageService(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<FinnhubService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;

        _alphavantageUrl = configuration.GetValue<string>("Alphavantage:Url")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _apiKey = configuration.GetValue<string>("Alphavantage:ApiKey")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");
    }

    private async Task<string> SendHttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_alphavantageUrl);
        //client.DefaultRequestHeaders.Add("X-Finnhub-Token", _apiKey);


        var request = new HttpRequestMessage(method, relativeUrl)
        { 
            Content = content 
        };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        _logger.LogInformation($"Alphavantage API response: {responseBody}");

        return responseBody;
    }

    public async Task<AlphavantageCompanyOverviewResponse> GetCompanyOverviewBySymbol(string stockSymbol)
    {
        try
        {
            var responseBody = await SendHttpRequestAsync(HttpMethod.Get, $"query?function=OVERVIEW&symbol={stockSymbol}&apikey={_apiKey}");

            _logger.LogInformation($"Alphavantage API response: {responseBody}");

            var companyOverview = JsonConvert.DeserializeObject<AlphavantageCompanyOverviewResponse>(responseBody);

            return companyOverview;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alphavantage API: {httpEx.Message}");
            throw;
        }
    }

}