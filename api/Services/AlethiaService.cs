using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using api.Interfaces;
using api.Models;
using api.Models.Alethia;

namespace api.Services;

public class AlethiaService : IAlethiaService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<FinnhubService> _logger;
    private readonly string _alethiaUrl;
    private readonly string _apiKey;

    private readonly JsonSerializerSettings serializerSettings = new()
    {
        NullValueHandling = NullValueHandling.Ignore
    };

    public AlethiaService(IHttpClientFactory httpClientFactory, IConfiguration configuration, ILogger<FinnhubService> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;

        _alethiaUrl = configuration.GetValue<string>("Alethia:Url")
            ?? throw new InvalidOperationException("URL must be set in the configuration.");

        _apiKey = configuration.GetValue<string>("Alethia:ApiKey")
            ?? throw new InvalidOperationException("API Key must be set in the configuration.");

    }

    private async Task<string> SendHttpRequestAsync(HttpMethod method, string relativeUrl, HttpContent content = null)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_alethiaUrl);
        client.DefaultRequestHeaders.Add("Accept-Version", "2");
        client.DefaultRequestHeaders.Add("key", _apiKey);

        var request = new HttpRequestMessage(method, relativeUrl) { Content = content };

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        _logger.LogInformation($"Alethia API response: {responseBody}");

        return responseBody;
    }

    public async Task<AlethiaStockResponse> GetStockDataBySymbol(string symbol)
    {
        try
        {

            var responseBody = await SendHttpRequestAsync(HttpMethod.Get, $"StockData?symbol={symbol}");

            _logger.LogInformation($"Alethia API response: {responseBody}");

            var stockResponse = JsonConvert.DeserializeObject<AlethiaStockResponse>(responseBody);

            return stockResponse;
        }
        catch (HttpRequestException httpEx)
        {
            _logger.LogError($"An error occurred when calling Alethia API: {httpEx.Message}");
            throw;
        }
    }
}