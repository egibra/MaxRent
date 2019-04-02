using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MaxRent.API.Migrations
{
    public partial class UpdatedOrdersEntityAddedDateCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Orders",
                nullable: false,
                defaultValue: new DateTime(2019, 4, 2, 21, 2, 37, 917, DateTimeKind.Local).AddTicks(8805));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Orders");
        }
    }
}
