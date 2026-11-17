using Microsoft.AspNetCore.Mvc;
using backend_projetointegrador.Model;

namespace backend_projetointegrador.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadosController : ControllerBase
    {
        private static readonly List<Estado> Estados = new()
        {
            new Estado { Sigla = "RN", Nome = "Rio Grande do Norte", PopulacaoTotal = 3302406, DensidadeDemografica = 62.5, TaxaUrbanizacao = 77.8, Idh = 0.731, PibBilhoes = 71.8, RendaPerCapita = 1312.00 },
            new Estado { Sigla = "SP", Nome = "São Paulo", PopulacaoTotal = 44411238, DensidadeDemografica = 178.9, TaxaUrbanizacao = 95.9, Idh = 0.826, PibBilhoes = 2300.0, RendaPerCapita = 2213.00 },
            new Estado { Sigla = "RJ", Nome = "Rio de Janeiro", PopulacaoTotal = 16054524, DensidadeDemografica = 365.2, TaxaUrbanizacao = 97.2, Idh = 0.796, PibBilhoes = 753.0, RendaPerCapita = 1882.00 },
            new Estado { Sigla = "BA", Nome = "Bahia", PopulacaoTotal = 14141626, DensidadeDemografica = 25.0, TaxaUrbanizacao = 72.1, Idh = 0.714, PibBilhoes = 352.0, RendaPerCapita = 1010.00 },
            new Estado { Sigla = "AM", Nome = "Amazonas", PopulacaoTotal = 3941613, DensidadeDemografica = 2.5, TaxaUrbanizacao = 79.2, Idh = 0.733, PibBilhoes = 131.0, RendaPerCapita = 1120.00 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Estado>> GetEstados()
        {
            return Ok(Estados);
        }

        [HttpGet("{sigla}")]
        public ActionResult<Estado> GetEstadoPorSigla(string sigla)
        {
            var estado = Estados.FirstOrDefault(e => e.Sigla.Equals(sigla, StringComparison.OrdinalIgnoreCase));
            if (estado == null)
            {
                return NotFound("Estado não encontrado.");
            }

            return Ok(estado);
        }
    }
}