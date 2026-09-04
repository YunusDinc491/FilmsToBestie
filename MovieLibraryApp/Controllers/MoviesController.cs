using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieLibraryApp.Context;
using MovieLibraryApp.Models;

namespace MovieLibraryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MoviesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetMovies(
    [FromQuery] string? category,
    [FromQuery] bool? isSeries,
    [FromQuery] string? search,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 50)
        {
            var allMovies = await _context.Movies.ToListAsync();
            var filtered = allMovies.AsEnumerable();

            if (!string.IsNullOrEmpty(category))
            {
                filtered = filtered.Where(m => m.Genres.Contains(category));
            }
            if (isSeries.HasValue)
            {
                filtered = filtered.Where(m => m.IsSeries == isSeries.Value);
            }
            if (!string.IsNullOrEmpty(search))
            {
                filtered = filtered.Where(m => m.Title.StartsWith(search, StringComparison.OrdinalIgnoreCase));
            }

            var filteredList = filtered.ToList();
            var totalCount = filteredList.Count;

            var movies = filteredList
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                items = movies,
                totalCount,
                page,
                pageSize
            });
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);

        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }
            _context.Entry(movie).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}