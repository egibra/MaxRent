using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MaxRent.API.Migrations
{
    public partial class UpdatedExpenseModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 9, 19, 49, 24, 677, DateTimeKind.Local).AddTicks(4314),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 766, DateTimeKind.Local).AddTicks(9778));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Expenses",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 9, 19, 49, 24, 683, DateTimeKind.Local).AddTicks(2854),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 770, DateTimeKind.Local).AddTicks(9874));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Expenses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Expenses");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 766, DateTimeKind.Local).AddTicks(9778),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 9, 19, 49, 24, 677, DateTimeKind.Local).AddTicks(4314));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Expenses",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 7, 20, 16, 58, 770, DateTimeKind.Local).AddTicks(9874),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 4, 9, 19, 49, 24, 683, DateTimeKind.Local).AddTicks(2854));
        }
    }
}
