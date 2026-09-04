using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MovieLibraryApp.Controllers
{
    public class OmdbSearchResult
    {
        [JsonPropertyName("Title")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("Year")]
        public string Year { get; set; } = string.Empty;

        [JsonPropertyName("imdbID")]
        public string ImdbId { get; set; } = string.Empty;

        [JsonPropertyName("Type")]
        public string Type { get; set; } = string.Empty;

        [JsonPropertyName("Poster")]
        public string Poster { get; set; } = string.Empty;
    }

    public class OmdbSearchResponse
    {
        [JsonPropertyName("Search")]
        public List<OmdbSearchResult>? Search { get; set; }

        [JsonPropertyName("Response")]
        public string Response { get; set; } = string.Empty;

        [JsonPropertyName("totalResults")]
        public string? TotalResults { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class OmdbController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public OmdbController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [HttpGet("search")]
        public async Task<ActionResult> Search([FromQuery] string query, [FromQuery] int page = 1)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(new { items = new List<OmdbSearchResult>(), totalCount = 0 });
            }

            var apiKey = _configuration["Omdb:ApiKey"];
            var client = _httpClientFactory.CreateClient();

            var omdbStartPage = (page - 1) * 5 + 1;
            var omdbPages = Enumerable.Range(omdbStartPage, 5);

            var tasks = omdbPages.Select(async omdbPage =>
            {
                var url = $"http://www.omdbapi.com/?apikey={apiKey}&s={Uri.EscapeDataString(query)}&page={omdbPage}";
                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode) return null;

                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<OmdbSearchResponse>(json);
            });

            var results = await Task.WhenAll(tasks);

            var allItems = new List<OmdbSearchResult>();
            var totalCount = 0;

            foreach (var result in results)
            {
                if (result?.Response == "True" && result.Search != null)
                {
                    allItems.AddRange(result.Search);
                    int.TryParse(result.TotalResults, out var parsedTotal);
                    if (parsedTotal > totalCount) totalCount = parsedTotal;
                }
            }

            var mappedItems = allItems.Select(item => new
            {
                title = item.Title,
                year = item.Year,
                imdbId = item.ImdbId,
                type = item.Type,
                poster = item.Poster
            });

            return Ok(new
            {
                items = mappedItems,
                totalCount
            });
        }
    }
}