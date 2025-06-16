using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models;

public class Deck
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int UserId { get; set; }
}