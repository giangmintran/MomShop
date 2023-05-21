using Microsoft.EntityFrameworkCore.Migrations;

namespace MOMShop.Migrations
{
    public partial class Discount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "ReceiveOrderDetails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldComment: "ReceiveProductCode");

            migrationBuilder.AlterColumn<int>(
                name: "PaymentType",
                table: "Orders",
                type: "int",
                nullable: false,
                comment: "1. Cod, 2.Bank",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "OrderStatus",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 1,
                comment: "1. Khoi tao, 2.Dang giao va chua nhan tien , 3.Dang giao va da nhan tien, 4. Hoan thanh, 5. Da xoa",
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 1,
                oldComment: "1. Khoi tao, 2.Da nhan, 3. Da giao, 4. Da xoa");

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DiscountCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiscountPercent = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "ReceiveOrderDetails",
                type: "nvarchar(max)",
                nullable: true,
                comment: "ReceiveProductCode",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PaymentType",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldComment: "1. Cod, 2.Bank");

            migrationBuilder.AlterColumn<int>(
                name: "OrderStatus",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 1,
                comment: "1. Khoi tao, 2.Da nhan, 3. Da giao, 4. Da xoa",
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 1,
                oldComment: "1. Khoi tao, 2.Dang giao va chua nhan tien , 3.Dang giao va da nhan tien, 4. Hoan thanh, 5. Da xoa");
        }
    }
}
