using System.Text.Json;
using api.Interfaces;
using api.Services;
using api.Data;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;


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

//add database context
builder.Services.AddDbContext<MarketAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection")));

//builder.Services.AddDbContext<MarketAppDbContext>(options =>
//{
//    options.UseNpgsql(builder.Configuration.GetConnectionString("SupabaseConnection"), npgsqlOptions =>
//    {
//        npgsqlOptions.EnableRetryOnFailure(); // Enable retry on failure
//        npgsqlOptions.MaxBatchSize(100);       // Maximum number of connections in the pool
//        npgsqlOptions.MinBatchSize(10); 
//        npgsqlOptions.ConnectionIdleLifetime = TimeSpan.FromSeconds(30); // Connection idle lifetime
//    });
//});


builder.WebHost.UseUrls("http://localhost:5286");

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

app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

//app.UseHttpsRedirection();

app.UseMvc();

app.UseAuthorization();

app.MapControllers();

app.Run();

