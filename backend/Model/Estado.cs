namespace backend_projetointegrador.Model
{
    public class Estado
    {
        public string Sigla { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public long PopulacaoTotal { get; set; }
        public double DensidadeDemografica { get; set; }
        public double TaxaUrbanizacao { get; set; }
        public double Idh { get; set; }
        public double PibBilhoes { get; set; }
        public double RendaPerCapita { get; set; }
    }
}