using backend_projetointegrador.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_projetointegrador.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login([FromBody] LoginRequest request)
    {
        if (request is null)
        {
            return BadRequest(new { message = "Dados de login inválidos." });
        }

        var result = _authService.Login(request.Email, request.Password);

        if (result is null)
        {
            return Unauthorized(new { message = "E-mail ou senha inválidos." });
        }

        return Ok(new LoginResponse
        {
            Email = result.Email,
            Nome = result.Nome,
            Perfil = result.Perfil,
            Token = result.Token,
            ExpiraEm = result.ExpiraEm
        });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public string Email { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Perfil { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiraEm { get; set; }
}
