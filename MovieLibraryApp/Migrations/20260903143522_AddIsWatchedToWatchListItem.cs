using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieLibraryApp.Migrations
{
    /// <inheritdoc />
    public partial class AddIsWatchedToWatchListItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsWatched",
                table: "WatchListItems",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "WatchedAt",
                table: "WatchListItems",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWatched",
                table: "WatchListItems");

            migrationBuilder.DropColumn(
                name: "WatchedAt",
                table: "WatchListItems");
        }
    }
}
