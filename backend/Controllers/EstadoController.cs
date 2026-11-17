using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Model;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstadoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Estado (Lista todos os estados com suas faixas etárias)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estado>>> GetTodos()
        {
            var estados = await _context.Estados
                .Include(e => e.EstruturasEtarias)
                .OrderBy(e => e.Nome)
                .ToListAsync();

            return Ok(estados);
        }

        // GET: api/Estado/RN (Busca um estado específico pela UF)
        [HttpGet("{uf}")]
        public async Task<ActionResult<Estado>> GetPorUf(string uf)
        {
            var estado = await _context.Estados
                .Include(e => e.EstruturasEtarias)
                .FirstOrDefaultAsync(e => e.Uf.ToLower() == uf.ToLower());

            if (estado == null)
            {
                return NotFound(new { mensagem = $"Estado '{uf}' não encontrado." });
            }

            return Ok(estado);
        }
    }
}