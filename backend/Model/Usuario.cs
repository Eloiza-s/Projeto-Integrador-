namespace backend_projetointegrador.Model
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Ativo { get; set; } = "S";
        public string Perfil { get; set; } = "Operador";
        public string Senha { get; set; } = string.Empty;
    }
}
