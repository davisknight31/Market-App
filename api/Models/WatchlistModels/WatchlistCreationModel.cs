using Newtonsoft.Json;

namespace api.Models.WatchlistModels;

public class WatchlistCreationModel
{
    public int userid { get; set; }
    public string name { get; set; }
    public string symbol { get; set; }
}