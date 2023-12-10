using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Employees_Assigned_Id",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_Assigned_Id",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Assigned_Id",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Tickets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_EmployeeId",
                table: "Tickets",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Employees_EmployeeId",
                table: "Tickets",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Employees_EmployeeId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_EmployeeId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "Assigned_Id",
                table: "Tickets",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_Assigned_Id",
                table: "Tickets",
                column: "Assigned_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Employees_Assigned_Id",
                table: "Tickets",
                column: "Assigned_Id",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }
    }
}
