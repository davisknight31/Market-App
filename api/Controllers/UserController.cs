using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Data;

namespace api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    //private readonly IWatchlistService _watchlistService;
    private readonly MarketAppDbContext _marketAppDbContext;

    public UserController(/*IWatchlistService watchlistService,*/ MarketAppDbContext marketAppDbContext)
    {
        //_watchlistService = watchlistService;
        _marketAppDbContext = marketAppDbContext;
    }

    [HttpGet("GetUser/{username}/{password}")]
    public async Task<IActionResult> GetUser(string username, string password)
    {
        var user = await _marketAppDbContext.users.FirstOrDefaultAsync(u => u.username == username && u.password == password);
        await _marketAppDbContext.SaveChangesAsync();

        if (user == null)
        {
            return NotFound(); // Or return an appropriate error response
        }

        return Ok(user);
    }


    //public async Task<IActionResult> CreateUser(User newUser)
    //{
    //    _context.Users.Add(newUser);
    //    await _context.SaveChangesAsync();

    //    return Ok(newUser);
    //}


    //[HttpGet("GetUser/{username}/{password}")]
    //public ActionResult GetUser()
    //{
    //    User user = _watchlistService.GetUser(username, password);
    //    return View(users);
    //}

}