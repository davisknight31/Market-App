namespace api.Models;

public class SharesUpdateModel
{
    public int userid { get; set; }
    public int symbolid { get; set; }
    public double quantity { get; set; }
    public double price { get; set; }
}