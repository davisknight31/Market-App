using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace api.Models.CompanyModels;

public class MainListStockModel
{
    [Key]
    public int symbolid { get; set; }
    public string symbol { get; set; }
    public string fullname { get; set; }
}