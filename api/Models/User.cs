namespace api.Models;

public class User
{
    public int userid { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public double balance { get; set; }
    public string? email { get; set; }
    public string? firstname { get; set; }
    public string? lastname { get; set; }
    public string? phonenumber { get; set; }
}