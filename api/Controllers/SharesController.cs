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
public class SharesController : ControllerBase
{
    private readonly MarketAppDbContext _marketAppDbContext;

    public SharesController(MarketAppDbContext marketAppDbContext)
    {
        _marketAppDbContext = marketAppDbContext;
    }



    [HttpPost("PurchaseShares")]
    public async Task<IActionResult> PurchaseShares([FromBody] SharesUpdateModel model)
    {

        try
        {
            var user = await _marketAppDbContext.users.FirstOrDefaultAsync(u => u.userid == model.userid);
            var shares = await _marketAppDbContext.shares.FirstOrDefaultAsync(s => s.userid == model.userid && s.symbolid == model.symbolid);

            if (user.balance < model.price * model.quantity)
            {
                return BadRequest("The user does not have the required funds.");
            }

            if (shares != null)
            {
                double newQuantity = shares.quantity + model.quantity;
                double newAveragePurchasePrice = ((shares.quantity * shares.averagepurchaseprice) + (model.quantity * model.price)) / newQuantity;


                shares.quantity = newQuantity;
                shares.averagepurchaseprice = newAveragePurchasePrice;
                shares.initialpurchasedate = DateTime.SpecifyKind(shares.initialpurchasedate, DateTimeKind.Utc);

                double newBalance = user.balance - (model.quantity * model.price);
                user.balance = newBalance;


                _marketAppDbContext.shares.Update(shares);
                _marketAppDbContext.users.Update(user);
                await _marketAppDbContext.SaveChangesAsync();
                return Ok(shares);
            }
            else
            {
                Shares newShares = new Shares
                {
                    userid = model.userid,
                    symbolid = model.symbolid,
                    quantity = model.quantity,
                    averagepurchaseprice = model.price,
                    initialpurchasedate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc)
                };

                double newBalance = user.balance - (model.quantity * model.price);
                user.balance = newBalance;


                _marketAppDbContext.shares.Add(newShares);
                _marketAppDbContext.users.Update(user);

                await _marketAppDbContext.SaveChangesAsync();
                return Ok(newShares);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while purchasing shares: " + ex.Message);

        }

    }

    [HttpPost("SellShares")]
    public async Task<IActionResult> SellShares([FromBody] SharesUpdateModel model)
    {

        try
        {
            var user = await _marketAppDbContext.users.FirstOrDefaultAsync(u => u.userid == model.userid);
            var shares = await _marketAppDbContext.shares.FirstOrDefaultAsync(s => s.userid == model.userid && s.symbolid == model.symbolid);

            if (shares.quantity == model.quantity)
            {
                double newBalance = user.balance + (model.quantity * model.price);
                user.balance = newBalance;

                _marketAppDbContext.shares.Remove(shares);
                _marketAppDbContext.users.Update(user);

                await _marketAppDbContext.SaveChangesAsync();

                return Ok();
            }
            else if (shares.quantity >= model.quantity)
            {
                double newQuantity = shares.quantity - model.quantity;

                shares.quantity = newQuantity;
                shares.initialpurchasedate = DateTime.SpecifyKind(shares.initialpurchasedate, DateTimeKind.Utc);


                double newBalance = user.balance + (model.quantity * model.price);
                user.balance = newBalance;

                _marketAppDbContext.shares.Update(shares);
                _marketAppDbContext.users.Update(user);
                await _marketAppDbContext.SaveChangesAsync();
                return Ok(shares);
            }
            else
            {
                return Ok("User does not have enough shares!");
            }

        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while selling shares: " + ex.Message);

        }
    }



    [HttpGet("GetUserShares/{userId}")]
    public async Task<IActionResult> GetUserShares(int userId)
    {
        try
        {
            var retrievedUserSharesList = _marketAppDbContext.shares.Where(s => s.userid == userId).ToList();
            return Ok(retrievedUserSharesList);

        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving user shares: " + ex.Message);

        }

    }
}
