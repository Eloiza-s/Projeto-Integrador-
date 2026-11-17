using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public static class DbSeeder
    {
        public static async Task PopularBancoAsync(AppDbContext context)
        {
            await context.Database.MigrateAsync();

            // Se já tiver estados cadastrados, não duplica
            if (await context.Estados.AnyAsync())
                return;

            var estados = new List<Estado>
            {
                new Estado
                {
                    CodigoIbge = 24,
                    Nome = "Rio Grande do Norte",
                    Uf = "RN",
                    Regiao = "Nordeste",
                    Populacao = 3302729,
                    DensidadeDemografica = 62.54m,
                    TaxaUrbanizacao = 77.80m,
                    Idh = 0.728m,
                    Pib = 80181000000.00m,
                    RendaPerCapita = 1373.00m,
                    SaneamentoBasico = 61.40m,
                    TaxaEscolarizacao = 97.60m,
                    EstruturasEtarias = new List<EstruturaEtaria>
                    {
                        new EstruturaEtaria { FaixaEtaria = "0 a 14 anos", PercentualMasculino = 10.30m, PercentualFeminino = 9.90m },
                        new EstruturaEtaria { FaixaEtaria = "15 a 59 anos", PercentualMasculino = 31.40m, PercentualFeminino = 33.10m },
                        new EstruturaEtaria { FaixaEtaria = "60 anos ou mais", PercentualMasculino = 6.80m, PercentualFeminino = 8.50m }
                    }
                },
                new Estado
                {
                    CodigoIbge = 35,
                    Nome = "São Paulo",
                    Uf = "SP",
                    Regiao = "Sudeste",
                    Populacao = 44411238,
                    DensidadeDemografica = 178.92m,
                    TaxaUrbanizacao = 95.90m,
                    Idh = 0.806m,
                    Pib = 2719751000000.00m,
                    RendaPerCapita = 2492.00m,
                    SaneamentoBasico = 92.60m,
                    TaxaEscolarizacao = 98.40m,
                    EstruturasEtarias = new List<EstruturaEtaria>
                    {
                        new EstruturaEtaria { FaixaEtaria = "0 a 14 anos", PercentualMasculino = 9.30m, PercentualFeminino = 8.90m },
                        new EstruturaEtaria { FaixaEtaria = "15 a 59 anos", PercentualMasculino = 31.80m, PercentualFeminino = 33.40m },
                        new EstruturaEtaria { FaixaEtaria = "60 anos ou mais", PercentualMasculino = 7.30m, PercentualFeminino = 9.30m }
                    }
                },
                new Estado
                {
                    CodigoIbge = 33,
                    Nome = "Rio de Janeiro",
                    Uf = "RJ",
                    Regiao = "Sudeste",
                    Populacao = 16055174,
                    DensidadeDemografica = 366.96m,
                    TaxaUrbanizacao = 96.70m,
                    Idh = 0.762m,
                    Pib = 949301000000.00m,
                    RendaPerCapita = 2367.00m,
                    SaneamentoBasico = 84.30m,
                    TaxaEscolarizacao = 98.10m,
                    EstruturasEtarias = new List<EstruturaEtaria>
                    {
                        new EstruturaEtaria { FaixaEtaria = "0 a 14 anos", PercentualMasculino = 9.10m, PercentualFeminino = 8.70m },
                        new EstruturaEtaria { FaixaEtaria = "15 a 59 anos", PercentualMasculino = 30.80m, PercentualFeminino = 32.80m },
                        new EstruturaEtaria { FaixaEtaria = "60 anos ou mais", PercentualMasculino = 8.00m, PercentualFeminino = 10.60m }
                    }
                },
                new Estado
                {
                    CodigoIbge = 13,
                    Nome = "Amazonas",
                    Uf = "AM",
                    Regiao = "Norte",
                    Populacao = 3941613,
                    DensidadeDemografica = 2.53m,
                    TaxaUrbanizacao = 79.10m,
                    Idh = 0.700m,
                    Pib = 131531000000.00m,
                    RendaPerCapita = 1172.00m,
                    SaneamentoBasico = 45.20m,
                    TaxaEscolarizacao = 95.80m,
                    EstruturasEtarias = new List<EstruturaEtaria>
                    {
                        new EstruturaEtaria { FaixaEtaria = "0 a 14 anos", PercentualMasculino = 13.40m, PercentualFeminino = 12.90m },
                        new EstruturaEtaria { FaixaEtaria = "15 a 59 anos", PercentualMasculino = 31.60m, PercentualFeminino = 32.10m },
                        new EstruturaEtaria { FaixaEtaria = "60 anos ou mais", PercentualMasculino = 4.70m, PercentualFeminino = 5.30m }
                    }
                },
                new Estado
                {
                    CodigoIbge = 53,
                    Nome = "Distrito Federal",
                    Uf = "DF",
                    Regiao = "Centro-Oeste",
                    Populacao = 2817381,
                    DensidadeDemografica = 489.06m,
                    TaxaUrbanizacao = 96.60m,
                    Idh = 0.814m,
                    Pib = 286944000000.00m,
                    RendaPerCapita = 3357.00m,
                    SaneamentoBasico = 94.80m,
                    TaxaEscolarizacao = 98.70m,
                    EstruturasEtarias = new List<EstruturaEtaria>
                    {
                        new EstruturaEtaria { FaixaEtaria = "0 a 14 anos", PercentualMasculino = 9.70m, PercentualFeminino = 9.30m },
                        new EstruturaEtaria { FaixaEtaria = "15 a 59 anos", PercentualMasculino = 32.50m, PercentualFeminino = 35.10m },
                        new EstruturaEtaria { FaixaEtaria = "60 anos ou mais", PercentualMasculino = 5.80m, PercentualFeminino = 7.60m }
                    }
                }
            };

            await context.Estados.AddRangeAsync(estados);
            await context.SaveChangesAsync();
        }
    }
}