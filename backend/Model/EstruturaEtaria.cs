using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    [Table("estruturas_etarias")]
    public class EstruturaEtaria
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        [Column("faixa_etaria")]
        public string FaixaEtaria { get; set; } = string.Empty; 

        [Column("percentual_masculino", TypeName = "numeric(5,2)")]
        public decimal PercentualMasculino { get; set; }

        [Column("percentual_feminino", TypeName = "numeric(5,2)")]
        public decimal PercentualFeminino { get; set; }

        // Chave Estrangeira para o Estado
        [Column("estado_id")]
        public int EstadoId { get; set; }

        [JsonIgnore]
        [ForeignKey("EstadoId")]
        public Estado? Estado { get; set; }
    }
}