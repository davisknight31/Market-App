export interface Watchlists {
  watchlists: Watchlist[];
}

export interface Watchlist {
  watchlistid: number;
  userid: number;
  name: string;
  entries: WatchlistEntry[];
}

interface WatchlistEntry {
  watchlistentryid: number;
  stocksymbol: string;
}
