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
            balance = 10000
        };

        try
        {
            var createdUser = _marketAppDbContext.users.Add(newUser);

            await _marketAppDbContext.SaveChangesAsync();
            
            return Ok(newUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while creating the user: " + ex.Message);
        }
    }

    [HttpGet("GetUserById/{userId}")]
    public async Task<IActionResult> GetUserById(int userId)
    {
        try
        {
            var retrievedUser = _marketAppDbContext.users.FirstOrDefault(u => u.userid == userId);
            retrievedUser.password = null;

            return Ok(retrievedUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving user balance: " + ex.Message);

        }

    }


    [HttpGet("GetUserBalance/{userId}")]
    public async Task<IActionResult> GetUserBalance(int userId)
    {
        try
        {
            var retrievedUser = _marketAppDbContext.users.FirstOrDefault(u => u.userid == userId);
            var balance = retrievedUser.balance;
            return Ok(balance);

        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving user balance: " + ex.Message);

        }
    }

    [HttpPut("UpdateUserPersonalDetails")]
    public async Task<IActionResult> UpdateUserPersonalDetails([FromBody] UpdateUserPersonalDetailsModel model)
    {
        try
        {
            var retrievedUser = _marketAppDbContext.users.FirstOrDefault(u => u.userid == model.userid);

            
            retrievedUser.username = model.username;
            retrievedUser.email = model.email;
            retrievedUser.firstname = model.firstname;
            retrievedUser.lastname = model.lastname;
            retrievedUser.phonenumber = model.phonenumber;
            

            _marketAppDbContext.users.Update(retrievedUser); 
            _marketAppDbContext.SaveChanges();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while updating the user: " + ex.Message);

        }
    }
}