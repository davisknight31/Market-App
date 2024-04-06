using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Models.UserModels;
using api.Data;
using BCrypt.Net;


namespace api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly MarketAppDbContext _marketAppDbContext;

    public UserController(MarketAppDbContext marketAppDbContext)
    {
        _marketAppDbContext = marketAppDbContext;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _marketAppDbContext.users.FirstOrDefaultAsync(u => u.username == model.username);

        if (user == null)
        {
            return NotFound(); 
        }

        bool passwordMatches = BCrypt.Net.BCrypt.Verify(model.password, user.password);


        if (passwordMatches)
        {
            await _marketAppDbContext.SaveChangesAsync();
            user.password = null;
            return Ok(user);
        }
        else
        {
            return BadRequest("Invalid username or password.");
        }
    }

    [HttpPost("CreateUser")]
    public async Task<IActionResult> CreateUser([FromBody] LoginModel model)
    {

        bool usernameExists = await _marketAppDbContext.users.AnyAsync(u => u.username == model.username);

        if (usernameExists)
        {
            return BadRequest("Username already exists.");
        }

        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.password);


        User newUser = new User
        {
            username = model.username,
            password = hashedPassword,
        };

        try
        {
            var createdUser = _marketAppDbContext.users.Add(newUser);

            await _marketAppDbContext.SaveChangesAsync();
            
            return Ok(createdUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while creating the user: " + ex.Message);
        }
    }



}