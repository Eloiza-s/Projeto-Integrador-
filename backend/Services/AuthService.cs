using backend_projetointegrador.Model;

namespace backend_projetointegrador.Services;

public class AuthService
{
    public AuthResult? Login(string email, string senha)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(senha))
        {
            return null;
        }

        var usuario = UsuarioDataStore.Usuarios.FirstOrDefault(u =>
            u.Email.Equals(email.Trim(), StringComparison.OrdinalIgnoreCase) &&
            u.Ativo == "S" &&
            u.Senha == senha.Trim());

        if (usuario == null)
        {
            return null;
        }

        return new AuthResult
        {
            Email = usuario.Email,
            Nome = usuario.Nome,
            Perfil = usuario.Perfil,
            Token = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{usuario.Email}:{Guid.NewGuid():N}")),
            ExpiraEm = DateTime.UtcNow.AddHours(8)
        };
    }
}

public class AuthResult
{
    public string Email { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Perfil { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiraEm { get; set; }
}
