namespace api.Models;
using System.ComponentModel.DataAnnotations;


public class WatchlistEntry
{
    [Key]
    public int watchlistid { get; set; }

    public string symbol { get; set; }
}