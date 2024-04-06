namespace api.Models;
using System.ComponentModel.DataAnnotations;


public class WatchlistEntry
{
    [Key]
    public int watchlistentryid { get; set; }

    public int watchlistid { get; set; }

    public string stocksymbol { get; set; }
}