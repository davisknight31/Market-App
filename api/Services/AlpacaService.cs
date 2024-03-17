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
    private readonly string _alpacaUrl;
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

        _alpacaUrl = configuration.GetValue<string>("Alpaca:Url")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _apiKey = configuration.GetValue<string>("Alpaca:ApiKey")
            ?? throw new InvalidOperationException("API Key must be set in the configuration.");

        _secretKey = configuration.GetValue<string>("Alpaca:SecretKey")
           ?? throw new InvalidOperationException("Secret Key must be set in the configuration.");
    }

    private async Task<string> SendHttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_alpacaUrl);
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

            var responseBody = await SendHttpRequestAsync(HttpMethod.Get, $"stocks/bars/latest?symbols={Uri.EscapeDataString(string.Join(",", stockSymbols))}");

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


}