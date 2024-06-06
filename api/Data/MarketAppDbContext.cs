using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Models.CompanyModels;

namespace api.Data;

public class MarketAppDbContext : DbContext
{
    public MarketAppDbContext(DbContextOptions<MarketAppDbContext> options) : base(options) {}

    public DbSet<User> users { get; set; }
    public DbSet<Watchlist> watchlists { get; set; }
    public DbSet<WatchlistEntry> watchlistentries { get; set; }
    public DbSet<TradesimsChoiceModel> tradesimschoice { get; set; }

}