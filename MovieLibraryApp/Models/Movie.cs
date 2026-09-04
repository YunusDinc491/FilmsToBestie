namespace MovieLibraryApp.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Genres { get; set; } = new();
        public int ReleaseYear { get; set; }
        public string PosterUrl { get; set; } = string.Empty;
        public double Rating { get; set; }
        public bool IsSeries { get; set; } = false;
        public string? ImdbId { get; set; }
    }
}