using Microsoft.EntityFrameworkCore.Migrations;

namespace MOMShop.Migrations
{
    public partial class history : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "HistoryUpdates",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Summary",
                table: "HistoryUpdates");
        }
    }
}
