using Newtonsoft.Json;

namespace api.Models.WatchlistModels;

public class WatchlistAdditionModel
{
    public int watchlistid { get; set; }
    public string symbol { get; set; }
}