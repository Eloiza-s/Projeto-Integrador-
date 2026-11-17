using backend_projetointegrador.Model;
using backend_projetointegrador.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_projetointegrador.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private static int _proximoId = UsuarioDataStore.Usuarios.Count + 1;

    [HttpGet]
    public ActionResult<IEnumerable<Usuario>> GetUsuarios()
    {
        return Ok(UsuarioDataStore.Usuarios.Where(u => u.Ativo == "S"));
    }

    [HttpGet("{id:int}")]
    public ActionResult<Usuario> GetUsuario(int id)
    {
        var usuario = UsuarioDataStore.Usuarios.FirstOrDefault(u => u.Id == id && u.Ativo == "S");
        if (usuario == null)
            return NotFound(new { message = "Usuário não encontrado." });

        return Ok(usuario);
    }

    [HttpPost]
    public ActionResult<Usuario> CriarUsuario([FromBody] Usuario usuario)
    {
        if (string.IsNullOrWhiteSpace(usuario.Nome) ||
            string.IsNullOrWhiteSpace(usuario.Email) ||
            string.IsNullOrWhiteSpace(usuario.Senha))
        {
            return BadRequest(new { message = "Nome, e-mail e senha são obrigatórios." });
        }

        if (UsuarioDataStore.Usuarios.Any(u => u.Email.Equals(usuario.Email, StringComparison.OrdinalIgnoreCase)))
        {
            return Conflict(new { message = "Já existe um usuário com este e-mail." });
        }

        usuario.Id = _proximoId++;
        usuario.Ativo = string.IsNullOrWhiteSpace(usuario.Ativo) ? "S" : usuario.Ativo;
        usuario.Perfil = string.IsNullOrWhiteSpace(usuario.Perfil) ? "Operador" : usuario.Perfil;

        UsuarioDataStore.Usuarios.Add(usuario);
        return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
    }

    [HttpPut("{id:int}")]
    public ActionResult AtualizarUsuario(int id, [FromBody] Usuario usuarioAtualizado)
    {
        var usuario = UsuarioDataStore.Usuarios.FirstOrDefault(u => u.Id == id && u.Ativo == "S");
        if (usuario == null)
            return NotFound(new { message = "Usuário não encontrado." });

        usuario.Nome = usuarioAtualizado.Nome;
        usuario.Email = usuarioAtualizado.Email;
        usuario.Perfil = usuarioAtualizado.Perfil;
        usuario.Ativo = usuarioAtualizado.Ativo;

        if (!string.IsNullOrWhiteSpace(usuarioAtualizado.Senha))
        {
            usuario.Senha = usuarioAtualizado.Senha;
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public ActionResult ExcluirUsuario(int id)
    {
        var usuario = UsuarioDataStore.Usuarios.FirstOrDefault(u => u.Id == id);
        if (usuario == null)
            return NotFound(new { message = "Usuário não encontrado." });

        usuario.Ativo = "N";
        return NoContent();
    }
}
