using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models;

public class FlashCard
{
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
    public int UserId { get; set; }
    public int TopicId { get; set; }
    public Topic? Topic { get; set; }
    public UserProfile? User { get; set; }
}