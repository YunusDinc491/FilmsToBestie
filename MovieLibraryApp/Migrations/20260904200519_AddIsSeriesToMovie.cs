using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieLibraryApp.Migrations
{
    /// <inheritdoc />
    public partial class AddIsSeriesToMovie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSeries",
                table: "Movies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSeries",
                table: "Movies");
        }
    }
}
