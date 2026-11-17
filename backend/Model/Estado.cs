using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("estados")]
    public class Estado
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("codigo_ibge")]
        public int CodigoIbge { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [MaxLength(2)]
        [Column("uf")]
        public string Uf { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        [Column("regiao")]
        public string Regiao { get; set; } = string.Empty;

        // Dados Demográficos
        [Column("populacao")]
        public long Populacao { get; set; }

        [Column("densidade_demografica", TypeName = "numeric(10,2)")]
        public decimal DensidadeDemografica { get; set; }

        [Column("taxa_urbanizacao", TypeName = "numeric(5,2)")]
        public decimal TaxaUrbanizacao { get; set; }

        // indicadores socioeconómicos
        [Column("idh", TypeName = "numeric(4,3)")]
        public decimal Idh { get; set; }

        [Column("pib", TypeName = "numeric(18,2)")]
        public decimal Pib { get; set; }

        [Column("renda_per_capita", TypeName = "numeric(10,2)")]
        public decimal RendaPerCapita { get; set; }

        [Column("saneamento_basico", TypeName = "numeric(5,2)")]
        public decimal SaneamentoBasico { get; set; }

        [Column("taxa_escolarizacao", TypeName = "numeric(5,2)")]
        public decimal TaxaEscolarizacao { get; set; }

        // Relação 1:N com a estrutura etária
        public List<EstruturaEtaria> EstruturasEtarias { get; set; } = new();
    }
}