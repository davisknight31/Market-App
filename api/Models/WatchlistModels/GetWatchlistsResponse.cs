namespace api.Models;
using System.ComponentModel.DataAnnotations;


public class GetWatchlistsResponse
{
   public List<SingleWatchlist> watchlists { get; set; }
}

public class SingleWatchlist
{
    public int watchlistid { get; set; }
    public int userid { get; set; }
    public string name { get; set; }
    public List<Entry> entries { get; set; }
}

public class Entry
{
    public int watchlistentryid { get; set; }
    public string stocksymbol { get; set; }
}