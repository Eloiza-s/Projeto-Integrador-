using backend_projetointegrador.Model;

namespace backend_projetointegrador.Services;

public static class UsuarioDataStore
{
    public static List<Usuario> Usuarios { get; } = new()
    {
        new Usuario
        {
            Id = 1,
            Nome = "Administrador Master",
            Email = "admin@empresa.com",
            Ativo = "S",
            Perfil = "Administrador",
            Senha = "admin123"
        },
        new Usuario
        {
            Id = 2,
            Nome = "Operador de Dados",
            Email = "operador@empresa.com",
            Ativo = "S",
            Perfil = "Operador",
            Senha = "operador123"
        },
        new Usuario
        {
            Id = 3,
            Nome = "Analista Regional",
            Email = "analista@empresa.com",
            Ativo = "S",
            Perfil = "Operador",
            Senha = "analista123"
        }
    };
}
