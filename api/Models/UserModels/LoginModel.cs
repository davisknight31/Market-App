using Newtonsoft.Json;

namespace api.Models.UserModels;

public class LoginModel
{
    public string username { get; set; }
    public string password { get; set; }
}