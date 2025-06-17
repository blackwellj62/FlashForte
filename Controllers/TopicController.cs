using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashForte.Models;
using FlashForte.Models.DTOs;
using FlashForte.Data;

namespace FlashForte.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TopicController : ControllerBase
{
    private FlashForteDbContext _dbContext;
    public TopicController(FlashForteDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]

    public IActionResult Get()
    {
        var TopicDTO = _dbContext.Topics.Select(t => new TopicDTO
        {
            Id = t.Id,
            Name = t.Name
        }).ToList();
        return Ok(TopicDTO);
    }

}