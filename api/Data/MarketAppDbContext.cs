using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data;

public class MarketAppDbContext : DbContext
{
    public MarketAppDbContext(DbContextOptions<MarketAppDbContext> options) : base(options) {}

    public DbSet<User> users { get; set; }
    public DbSet<Watchlist> Watchlists { get; set; }
    public DbSet<WatchlistEntry> WatchlistEntries { get; set; }


}