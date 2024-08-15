using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace api.Models.CompanyModels;

public class TradesimsChoiceModel
{
    [Key]
    public int symbolid { get; set; }

    public string symbol { get; set; }
    public string description { get; set; }
    public string fullname { get; set; }
}