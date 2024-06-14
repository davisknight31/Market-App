using System.Text.Json;
using api.Interfaces;
using api.Services;
using api.Data;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.AspNetCore.HttpsPolicy;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc(options => options.EnableEndpointRouting = false);
builder.Services.AddCors();

//register http client
builder.Services.AddHttpClient();

//builder.Services.AddHttpsRedirection(options =>
//{
//    options.HttpsPort = 5286; // Specify the HTTPS port
//});


//add database context
builder.Services.AddDbContext<MarketAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection")));



builder.WebHost.UseKestrel(options =>
{
    options.ListenAnyIP(5286, listenOptions =>
    {
        listenOptions.UseHttps(); // Enable HTTPS
    });
});






//register api services
builder.Services.AddTransient<IFinnhubService, FinnhubService>();
builder.Services.AddTransient<IAlphavantageService, AlphavantageService>();
builder.Services.AddTransient<IAlpacaService, AlpacaService>();
builder.Services.AddTransient<IAlethiaService, AlethiaService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());


app.UseMvc();

app.UseAuthorization();

app.MapControllers();


app.Run();


