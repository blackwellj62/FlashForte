using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using FlashForte.Models;
using Microsoft.AspNetCore.Identity;

namespace FlashForte.Data;
public class FlashForteDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Deck> Decks { get; set; }
    public DbSet<FlashCard> FlashCards { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<DeckFlashCard> DeckFlashCards { get; set; }

    public FlashForteDbContext(DbContextOptions<FlashForteDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
        });

        modelBuilder.Entity<Deck>().HasData(new Deck[]
        {
            new Deck
            {
                Id = 1,
                Name = "Bb Scale",
                Description = "The notes of the Bb Scale",
                UserId = 1
            },
            new Deck
            {
                Id = 2,
                Name = "C Scale",
                Description = "The notes of the C Scale",
                UserId = 1
            }
        });
        modelBuilder.Entity<FlashCard>().HasData(new FlashCard[]
        {
            new FlashCard
            {
                Id = 1,
                Question = "What is the 3rd note of the Bb Scale?",
                Answer = "D",
                UserId = 1,
                TopicId = 1
            },
           new FlashCard
            {
                Id = 2,
                Question = "What is the 5th note of the Bb Scale?",
                Answer = "F",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 3,
                Question = "What is the 7th note of the Bb Scale?",
                Answer = "A",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 4,
                Question = "What is the 4th note of the Bb Scale?",
                Answer = "Eb",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 5,
                Question = "What is the 6th note of the Bb Scale?",
                Answer = "G",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 6,
                Question = "What is the 2nd note of the Bb Scale?",
                Answer = "C",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 7,
                Question = "What is the 1st note of the Bb Scale?",
                Answer = "Bb",
                UserId = 1,
                TopicId = 1
            },
            new FlashCard
            {
                Id = 8,
                Question = "What is the 8th note of the Bb Scale?",
                Answer = "Bb",
                UserId = 1,
                TopicId = 1
            }

        });
        modelBuilder.Entity<Topic>().HasData(new Topic[]
        {
            new Topic
            {
                Id = 1,
                Name = "Scales"
            },
            new Topic
            {
                Id = 2,
                Name = "Intervals"
            },
            new Topic
            {
                Id = 3,
                Name = "Clefs"
            },
            new Topic
            {
                Id = 4,
                Name = "Key Signatures"
            },
            new Topic
            {
                Id = 5,
                Name = "Time Signatures"
            },
            new Topic
            {
                Id = 6,
                Name = "Rhythms"
            },
            new Topic
            {
                Id = 7,
                Name = "Articulations"
            },
            new Topic
            {
                Id = 8,
                Name = "Dynamics"
            },
            new Topic
            {
                Id = 9,
                Name = "History"
            },
            new Topic
            {
                Id = 10,
                Name = "Other"
            }
        });
        modelBuilder.Entity<DeckFlashCard>().HasData(new DeckFlashCard[]
        {
            new DeckFlashCard
            {
                Id = 1,
                DeckId = 1,
                FlashCardId = 1
            },
            new DeckFlashCard
            {
                Id = 2,
                DeckId = 1,
                FlashCardId = 2
            },
            new DeckFlashCard
            {
                Id = 3,
                DeckId = 1,
                FlashCardId = 3
            },
            new DeckFlashCard
            {
                Id = 4,
                DeckId = 1,
                FlashCardId = 4
            },
            new DeckFlashCard
            {
                Id = 5,
                DeckId = 1,
                FlashCardId = 5
            },
            new DeckFlashCard
            {
                Id = 6,
                DeckId = 1,
                FlashCardId = 6
            },
            new DeckFlashCard
            {
                Id = 7,
                DeckId = 1,
                FlashCardId = 7
            },
            new DeckFlashCard
            {
                Id = 8,
                DeckId = 1,
                FlashCardId = 8
            }
        });
        
    }
}