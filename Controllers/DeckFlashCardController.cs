using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashForte.Models;
using FlashForte.Models.DTOs;
using FlashForte.Data;

namespace FlashForte.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class DeckFlashCardController : ControllerBase
{
    private FlashForteDbContext _dbContext;
    public DeckFlashCardController(FlashForteDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    [Authorize]

    public IActionResult NewDeckFlashCard(DeckFlashCard deckFlashCard)
    {
        _dbContext.DeckFlashCards.Add(deckFlashCard);
        _dbContext.SaveChanges();
        return Created($"/api/deckflashcard/{deckFlashCard.Id}", deckFlashCard);
    }

    [HttpGet]
    [Authorize]

    public IActionResult Get()
    {
        var DeckFlashCardDTO = _dbContext.DeckFlashCards.Select(df => new DeckFlashCardDTO
        {
            Id = df.Id,
            DeckId = df.DeckId,
            FlashCardId = df.FlashCardId
        }).ToList();
        return Ok(DeckFlashCardDTO);
    }
}