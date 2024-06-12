using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Models.WatchlistModels;
using api.Data;

[Route("api/[controller]")]
[ApiController]
public class WatchlistController : ControllerBase
{
    private readonly MarketAppDbContext _marketAppDbContext;

    public WatchlistController(MarketAppDbContext marketAppDbContext)
    {
        _marketAppDbContext = marketAppDbContext;
    }

    [HttpGet("GetWatchlists/{userId}")]
    public async Task<IActionResult> GetWatchlists(int userId)
    {
        try
        {
            var retrievedWatchlists = _marketAppDbContext.watchlists.Where(w => w.userid == userId).ToList();

            List<SingleWatchlist> userWatchlists = new List<SingleWatchlist>();

            foreach (var watchlist in retrievedWatchlists)
            {
                var retrievedEntries = _marketAppDbContext.watchlistentries.Where(w => w.watchlistid == watchlist.watchlistid);
                List<Entry> watchlistEntries = new List<Entry>();
                foreach (var entry in retrievedEntries)
                {
                    Entry formattedEntry = new Entry
                    {
                        watchlistentryid = entry.watchlistentryid,
                        stocksymbol = entry.stocksymbol,
                    };

                    watchlistEntries.Add(formattedEntry);
                }

                SingleWatchlist formattedWatchlist = new SingleWatchlist
                {
                    watchlistid = watchlist.watchlistid,
                    userid = watchlist.userid,
                    name = watchlist.name,
                    entries = watchlistEntries
                };
                userWatchlists.Add(formattedWatchlist);
            }
            GetWatchlistsResponse watchlistResponse = new GetWatchlistsResponse
            {
                watchlists = userWatchlists
            };

            return Ok(watchlistResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving watchlists: " + ex.Message);

        }

    }

    [HttpPost("CreateAndAddToWatchlist")]
    public async Task<IActionResult> CreateAndAddToWatchlist([FromBody] WatchlistCreationModel model)
    {
        var userWatchlists = _marketAppDbContext.watchlists.Where(w => w.userid == model.userid).ToList();

        //bool nameExists = await _marketAppDbContext.watchlists.AnyAsync(w => w.name == model.name);

        foreach (var userWatchlist in userWatchlists)
        {
            if (userWatchlist.name == model.name)
            {
                return BadRequest("A watchlist already exists with that name.");
            }
        }

        Watchlist watchlist = new Watchlist
        {
            userid = model.userid,
            name = model.name
        };

        try
        {
            var createdWatchlist = _marketAppDbContext.watchlists.Add(watchlist);

            await _marketAppDbContext.SaveChangesAsync();

            var newWatchlist = await _marketAppDbContext.watchlists.FirstOrDefaultAsync(w => w.name == model.name);


            WatchlistEntry watchlistEntry = new WatchlistEntry
            {
                watchlistid = newWatchlist.watchlistid,
                stocksymbol = model.symbol,
            };

            var newEntry = _marketAppDbContext.watchlistentries.Add(watchlistEntry);

            _marketAppDbContext.SaveChanges();

            return Ok(watchlistEntry);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while creating the watchlist: " + ex.Message);

        }
    }

    [HttpPut("AddToWatchlist")]
    public async Task<IActionResult> AddToWatchlist([FromBody] WatchlistAdditionModel model)
    {
        var userWatchlistEntries = _marketAppDbContext.watchlistentries.Where(e => e.watchlistid == model.watchlistid).ToList();

        foreach (var entry in userWatchlistEntries)
        {
            if (entry.stocksymbol == model.symbol)
            {
                return BadRequest("That watchlist already contains this symbol.");
            }
        }

        WatchlistEntry watchlistEntry = new WatchlistEntry
        {
            watchlistid = model.watchlistid,
            stocksymbol = model.symbol,
        };

        try
        {
            var createdEntry = _marketAppDbContext.watchlistentries.Add(watchlistEntry);

            await _marketAppDbContext.SaveChangesAsync();

            return Ok(watchlistEntry);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while creating the watchlist: " + ex.Message);
        }
    }


    [HttpDelete("RemoveWatchlistEntry/{watchlistEntryId}")]
    public async Task<IActionResult> RemoveWatchlistEntry(int watchlistEntryId)
    {
        try
        {
            var entryToRemove = _marketAppDbContext.watchlistentries.FirstOrDefault(w => w.watchlistentryid == watchlistEntryId);

            if (entryToRemove != null)
            {
                _marketAppDbContext.watchlistentries.Remove(entryToRemove);
                _marketAppDbContext.SaveChanges();
            }

            _marketAppDbContext.SaveChanges();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while removing from the watchlist: " + ex.Message);
        }
    }

    [HttpDelete("RemoveWatchlist/{watchlistId}")]
    public async Task<IActionResult> RemoveWatchlist(int watchlistId)
    {
        try
        {
            var watchlistToRemove = _marketAppDbContext.watchlists.FirstOrDefault(w => w.watchlistid == watchlistId);

            var watchlistEntries = _marketAppDbContext.watchlistentries.Where(e => e.watchlistid == watchlistId).ToList();

            foreach(var entry in watchlistEntries)
            {
                _marketAppDbContext.watchlistentries.Remove(entry);
                _marketAppDbContext.SaveChanges();
            }

            _marketAppDbContext.watchlists.Remove(watchlistToRemove);

            _marketAppDbContext.SaveChanges();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while removing the watchlist: " + ex.Message);
        }
    }
}