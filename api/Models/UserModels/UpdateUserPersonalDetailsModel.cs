using Newtonsoft.Json;

namespace api.Models.UserModels;

public class UpdateUserPersonalDetailsModel
{
    public int userid { get; set; }
    public string username { get; set; }
    public string email { get; set; }
    public string firstname { get; set; }
    public string lastname { get; set; }
    public string phonenumber { get; set; }
}