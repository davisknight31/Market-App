namespace api.Models;

public class Shares
{
    public int sharesid { get; set; }
    public int userid { get; set; }
    public int symbolid { get; set; }
    public double quantity { get; set; }
    public double averagepurchaseprice { get; set; }
    public DateTime initialpurchasedate { get; set; }
}