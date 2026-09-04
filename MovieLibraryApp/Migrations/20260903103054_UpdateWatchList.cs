using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MovieLibraryApp.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWatchList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItem_Movies_MovieId",
                table: "WatchListItem");

            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItem_Users_UserId",
                table: "WatchListItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchListItem",
                table: "WatchListItem");

            migrationBuilder.RenameTable(
                name: "WatchListItem",
                newName: "WatchListItems");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItem_UserId",
                table: "WatchListItems",
                newName: "IX_WatchListItems_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItem_MovieId",
                table: "WatchListItems",
                newName: "IX_WatchListItems_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchListItems",
                table: "WatchListItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItems_Movies_MovieId",
                table: "WatchListItems",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItems_Users_UserId",
                table: "WatchListItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItems_Movies_MovieId",
                table: "WatchListItems");

            migrationBuilder.DropForeignKey(
                name: "FK_WatchListItems_Users_UserId",
                table: "WatchListItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WatchListItems",
                table: "WatchListItems");

            migrationBuilder.RenameTable(
                name: "WatchListItems",
                newName: "WatchListItem");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItems_UserId",
                table: "WatchListItem",
                newName: "IX_WatchListItem_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_WatchListItems_MovieId",
                table: "WatchListItem",
                newName: "IX_WatchListItem_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WatchListItem",
                table: "WatchListItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItem_Movies_MovieId",
                table: "WatchListItem",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WatchListItem_Users_UserId",
                table: "WatchListItem",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
