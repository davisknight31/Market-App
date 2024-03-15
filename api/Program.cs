using System.Text.Json;
using api.Interfaces;
using api.Services;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


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

builder.Services.AddTransient<IFinnhubService, FinnhubService>();
builder.Services.AddTransient<IAlphavantageService, AlphavantageService>();



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

app.UseHttpsRedirection();

app.UseMvc();

app.UseAuthorization();

app.MapControllers();




app.Run();

