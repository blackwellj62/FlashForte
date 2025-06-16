using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models;

public class DeckFlashCard
{
    public int Id { get; set; }
    public int DeckId { get; set; }
    public int FlashCardId { get; set; }
}
