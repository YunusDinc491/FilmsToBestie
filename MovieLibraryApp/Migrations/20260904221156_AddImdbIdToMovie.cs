using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieLibraryApp.Migrations
{
    /// <inheritdoc />
    public partial class AddImdbIdToMovie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImdbId",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImdbId",
                table: "Movies");
        }
    }
}
