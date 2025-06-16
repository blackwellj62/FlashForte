using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models.DTOs;

public class DeckFlashCardDTO
{
    public int Id { get; set; }
    public int DeckId { get; set; }
    public int FlashCardId { get; set; }
    public DeckDTO? Deck { get; set; }
    public FlashCardDTO? FlashCard { get; set; }
}
