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
        var FlashCardDTO = _dbContext.FlashCards.Include(fc=>fc.Topic).Include(fc=>fc.User).Select(fc => new FlashCardDTO
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
}