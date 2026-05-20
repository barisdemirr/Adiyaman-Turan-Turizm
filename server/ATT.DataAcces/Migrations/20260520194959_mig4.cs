using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATT.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class mig4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ContactInfos");

            migrationBuilder.DropColumn(
                name: "InstagramUsername",
                table: "ContactInfos");

            migrationBuilder.RenameColumn(
                name: "WhatsappPhone",
                table: "ContactInfos",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "ContactInfos",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "ContactInfos",
                newName: "WhatsappPhone");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ContactInfos",
                newName: "Phone");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ContactInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InstagramUsername",
                table: "ContactInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
