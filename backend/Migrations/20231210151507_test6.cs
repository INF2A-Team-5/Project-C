using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class test6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Employees_EmployeeId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Employees_AccountId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Tickets",
                newName: "Employee_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_EmployeeId",
                table: "Tickets",
                newName: "IX_Tickets_Employee_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AccountId",
                table: "Employees",
                column: "AccountId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Employees_Employee_Id",
                table: "Tickets",
                column: "Employee_Id",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Employees_Employee_Id",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Employees_AccountId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "Employee_Id",
                table: "Tickets",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_Employee_Id",
                table: "Tickets",
                newName: "IX_Tickets_EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AccountId",
                table: "Employees",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Employees_EmployeeId",
                table: "Tickets",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }
    }
}
