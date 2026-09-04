using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieLibraryApp.Context;
using MovieLibraryApp.Models;
using System.Security.Claims;

namespace MovieLibraryApp.Controllers
{
    public class MarkWatchedRequest
    {
        public DateTime? WatchedAt { get; set; }
        public int Rating { get; set; }
    }

    public class AddOmdbMovieRequest
    {
        public string ImdbId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public string Poster { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchListController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WatchListController(AppDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            return int.Parse(idClaim);
        }
        [HttpGet]
        public async Task<ActionResult> GetMyWatchList([FromQuery] bool watched = false)
        {
            var userId = GetCurrentUserId();
            var rawItems = await _context.WatchListItems
                .Include(x => x.Movie)
                .Where(x => x.UserId == userId && x.IsWatched == watched)
                .ToListAsync();

            var items = rawItems.Select(x => new
            {
                x.Movie.Id,
                x.Movie.Title,
                x.Movie.Description,
                x.Movie.Genres,
                x.Movie.ReleaseYear,
                x.Movie.PosterUrl,
                x.Movie.Rating,
                x.Movie.IsSeries,
                x.UserRating,
                x.WatchedAt
            });
            return Ok(items);
        }
        [HttpPost("{movieId}")]
        public async Task<IActionResult> AddToWatchList(int movieId)
        {
            var userId = GetCurrentUserId();

            var movieExists = await _context.Movies.AnyAsync(m => m.Id == movieId);
            if (!movieExists)
            {
                return NotFound("Movie not found.");
            }

            var alreadyAdded = await _context.WatchListItems
                .AnyAsync(w => w.UserId == userId && w.MovieId == movieId);

            if (alreadyAdded)
            {
                return BadRequest("Movie is already in your watch list.");
            }

            var item = new WatchListItem
            {
                UserId = userId,
                MovieId = movieId
            };

            _context.WatchListItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok("Movie added to watch list.");
        }
        [HttpPost("omdb")]
        public async Task<IActionResult> AddOmdbMovieToWatchList(AddOmdbMovieRequest request)
        {
            var userId = GetCurrentUserId();

            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.ImdbId == request.ImdbId);

            if (movie == null)
            {
                int.TryParse(request.Year, out var year);
                movie = new Movie
                {
                    Title = request.Title,
                    Description = "",
                    Genres = new List<string>(),
                    ReleaseYear = year,
                    PosterUrl = request.Poster != "N/A" ? request.Poster : "",
                    Rating = 0,
                    IsSeries = request.Type == "series",
                    ImdbId = request.ImdbId
                };
                _context.Movies.Add(movie);
                await _context.SaveChangesAsync();
            }

            var alreadyAdded = await _context.WatchListItems
                .AnyAsync(w => w.UserId == userId && w.MovieId == movie.Id);

            if (alreadyAdded)
            {
                return BadRequest("Movie is already in your watch list.");
            }

            var item = new WatchListItem
            {
                UserId = userId,
                MovieId = movie.Id
            };

            _context.WatchListItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok("Movie added to watch list.");
        }


        [HttpDelete("{movieId}")]
        public async Task<IActionResult> RemoveFromWatchList(int movieId)
        {
            var userId = GetCurrentUserId();

            var item = await _context.WatchListItems
                .FirstOrDefaultAsync(w => w.UserId == userId && w.MovieId == movieId);

            if (item == null)
            {
                return NotFound();
            }

            _context.WatchListItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPatch("{movieId}/watched")]
        public async Task<IActionResult> MarkAsWatched(int movieId, [FromBody] MarkWatchedRequest request)
        {
            if (request.Rating < 1 || request.Rating > 10)
            {
                return BadRequest("Rating must be between 1 and 10.");
            }

            var userId = GetCurrentUserId();

            var item = await _context.WatchListItems
                .FirstOrDefaultAsync(w => w.UserId == userId && w.MovieId == movieId);

            if (item == null)
            {
                return NotFound();
            }

            item.IsWatched = true;
            item.WatchedAt = request.WatchedAt ?? DateTime.UtcNow;
            item.UserRating = request.Rating;
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
