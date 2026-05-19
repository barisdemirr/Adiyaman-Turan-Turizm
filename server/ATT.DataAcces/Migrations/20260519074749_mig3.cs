using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATT.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class mig3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "AboutItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "AboutItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
