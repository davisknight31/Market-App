using Newtonsoft.Json;

namespace api.Models.Alpaca;


public class AlpacaNewsArticlesResponse
{
    public List<NewsItem> News { get; set; }

    public string NextPageToken { get; set; }
}

public class NewsItem
{
    public string Author { get; set; }

    public string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Headline { get; set; }

    public int Id { get; set; }

    public List<Image> Images { get; set; }

    public string Source { get; set; }

    public string Summary { get; set; }

    public List<string> Symbols { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string Url { get; set; }
}

public class Image
{
    public string Size { get; set; }

    public string Url { get; set; }
}