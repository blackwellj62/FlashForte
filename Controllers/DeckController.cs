using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashForte.Models;
using FlashForte.Models.DTOs;
using FlashForte.Data;

namespace FlashForte.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DecksController : ControllerBase
{
    private FlashForteDbContext _dbContext;
    public DecksController(FlashForteDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]

    public IActionResult Get()
    {
        var DeckDTO = _dbContext.Decks.Select(d => new DeckDTO
        {
            Id = d.Id,
            Name = d.Name,
            Description = d.Description,
            UserId = d.UserId,
            
        }).ToList();
        return Ok(DeckDTO);
    }

    [HttpPost]
    [Authorize]

    public IActionResult NewDeck(Deck deck)
    {
        _dbContext.Decks.Add(deck);
        _dbContext.SaveChanges();
        return Created($"/api/decks/{deck.Id}", deck);
    }
}