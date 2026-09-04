namespace MovieLibraryApp.Models
{
    public class WatchListItem
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
        public bool IsWatched { get; set; } = false;
        public DateTime? WatchedAt { get; set; }
        public int? UserRating { get; set; }
    }
}