using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models.DTOs;

public class DeckDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int UserId { get; set; }
    public UserProfileDTO? User { get; set; }
}