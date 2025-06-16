using Microsoft.AspNetCore.Identity;

namespace FlashForte.Models.DTOs;

public class FlashCardDTO
{
    public int Id { get; set; }
    public string Question { get; set; }
    public string Answer { get; set; }
    public int UserId { get; set; }
    public int TopicId { get; set; }
    public UserProfileDTO? User { get; set; }
    public TopicDTO? Topic { get; set; }
}