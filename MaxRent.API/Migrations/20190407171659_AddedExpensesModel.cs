using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MaxRent.API.Migrations
{
    public partial class AddedExpensesModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialPrice",
                table: "Products");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 766, DateTimeKind.Local).AddTicks(9778),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 2, 21, 2, 37, 917, DateTimeKind.Local).AddTicks(8805));

            migrationBuilder.AddColumn<double>(
                name: "InitialPrice",
                table: "Assets",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Sum = table.Column<double>(nullable: false),
                    ExpenseType = table.Column<int>(nullable: false, defaultValue: 3),
                    DateCreated = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 770, DateTimeKind.Local).AddTicks(9874)),
                    AssetId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_AssetId",
                table: "Expenses",
                column: "AssetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropColumn(
                name: "InitialPrice",
                table: "Assets");

            migrationBuilder.AddColumn<double>(
                name: "InitialPrice",
                table: "Products",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 2, 21, 2, 37, 917, DateTimeKind.Local).AddTicks(8805),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 766, DateTimeKind.Local).AddTicks(9778));
        }
    }
}
