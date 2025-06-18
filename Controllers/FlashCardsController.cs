using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashForte.Models;
using FlashForte.Models.DTOs;
using FlashForte.Data;

namespace FlashForte.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlashCardsController : ControllerBase
{
    private FlashForteDbContext _dbContext;
    public FlashCardsController(FlashForteDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]

    public IActionResult Get()
    {
        var FlashCardDTO = _dbContext.FlashCards.Include(fc => fc.Topic).Include(fc => fc.User).Select(fc => new FlashCardDTO
        {
            Id = fc.Id,
            Question = fc.Question,
            Answer = fc.Answer,
            UserId = fc.UserId,
            TopicId = fc.TopicId,
            Topic = fc.Topic == null ? null : new TopicDTO
            {
                Id = fc.Topic.Id,
                Name = fc.Topic.Name
            },
            User = fc.User == null ? null : new UserProfileDTO
            {
                Id = fc.User.Id,
                FirstName = fc.User.FirstName,
                LastName = fc.User.LastName
            }
        }).ToList();
        return Ok(FlashCardDTO);
    }

    [HttpPost]
    [Authorize]

    public IActionResult NewCard(FlashCard flashCard)
    {
        _dbContext.FlashCards.Add(flashCard);
        _dbContext.SaveChanges();
        return Created($"/api/flashcards/{flashCard.Id}", flashCard);
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteFlashCard(int id)
    {
        var flashcard = _dbContext.FlashCards.SingleOrDefault(f => f.Id == id);
        if (flashcard == null)
        {
            return NotFound();
        }
        var relatedDeckFlashCards = _dbContext.DeckFlashCards
        .Where(df => df.FlashCardId == id);

        _dbContext.DeckFlashCards.RemoveRange(relatedDeckFlashCards);
        _dbContext.Remove(flashcard);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    [Authorize]

    public IActionResult GetFlashCardById(int id)
    {
        FlashCard flashCard = _dbContext.FlashCards.Include(f => f.Topic)
        .Include(f => f.User).SingleOrDefault(f => f.Id == id);

        if (flashCard == null)
        {
            return NotFound();
        }
        return Ok(flashCard);
    }

    [HttpPut("{id}")]
    [Authorize]

    public IActionResult UpdateFlashCard(FlashCard flashCard, int id)
    {
        FlashCard flashCardToUpdate = _dbContext.FlashCards.SingleOrDefault(fc => fc.Id == id);
        if (flashCardToUpdate == null)
        {
            return NotFound();
        }
        else if (id != flashCard.Id)
        {
            return BadRequest();
        }

        flashCardToUpdate.Question = flashCard.Question;
        flashCardToUpdate.Answer = flashCard.Answer;
        flashCardToUpdate.TopicId = flashCard.TopicId;

        _dbContext.SaveChanges();
        return NoContent();
    }
}