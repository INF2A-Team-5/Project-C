using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class reijosajdf : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Machines_Customers_CustomerId",
                table: "Machines");

            migrationBuilder.DropIndex(
                name: "IX_Machines_CustomerId",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Machines");

            migrationBuilder.AddColumn<int>(
                name: "Customer_Id",
                table: "Machines",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Machines_Customer_Id",
                table: "Machines",
                column: "Customer_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Machines_Customers_Customer_Id",
                table: "Machines",
                column: "Customer_Id",
                principalTable: "Customers",
                principalColumn: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Machines_Customers_Customer_Id",
                table: "Machines");

            migrationBuilder.DropIndex(
                name: "IX_Machines_Customer_Id",
                table: "Machines");

            migrationBuilder.DropColumn(
                name: "Customer_Id",
                table: "Machines");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Machines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Machines_CustomerId",
                table: "Machines",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Machines_Customers_CustomerId",
                table: "Machines",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
