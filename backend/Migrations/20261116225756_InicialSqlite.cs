using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InicialSqlite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "estados",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    codigo_ibge = table.Column<int>(type: "INTEGER", nullable: false),
                    nome = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    uf = table.Column<string>(type: "TEXT", maxLength: 2, nullable: false),
                    regiao = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    populacao = table.Column<long>(type: "INTEGER", nullable: false),
                    densidade_demografica = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    taxa_urbanizacao = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    idh = table.Column<decimal>(type: "numeric(4,3)", nullable: false),
                    pib = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    renda_per_capita = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    saneamento_basico = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    taxa_escolarizacao = table.Column<decimal>(type: "numeric(5,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_estados", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "estruturas_etarias",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    faixa_etaria = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    percentual_masculino = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    percentual_feminino = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    estado_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_estruturas_etarias", x => x.id);
                    table.ForeignKey(
                        name: "FK_estruturas_etarias_estados_estado_id",
                        column: x => x.estado_id,
                        principalTable: "estados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_estados_codigo_ibge",
                table: "estados",
                column: "codigo_ibge",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_estados_uf",
                table: "estados",
                column: "uf",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_estruturas_etarias_estado_id",
                table: "estruturas_etarias",
                column: "estado_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "estruturas_etarias");

            migrationBuilder.DropTable(
                name: "estados");
        }
    }
}
