# Angular 22 - CRUD de Usuários

Aplicação standalone em Angular 22 para consumir a Web API:

`http://localhost:5258/api/usuarios`

## Funcionalidades

- Listar usuários - GET `/api/usuarios`
- Buscar usuário por ID - GET `/api/usuarios/{id}`
- Criar usuário - POST `/api/usuarios`
- Atualizar usuário - PUT `/api/usuarios/{id}`
- Excluir usuário - DELETE `/api/usuarios/{id}`
- Formulário reativo com validação
- Angular Material
- Signals
- ChangeDetection OnPush
- Aplicação zoneless, sem zone.js
- Tratamento básico de erros HTTP
- Confirmação antes da exclusão

## Requisitos

- Node.js compatível com Angular 22
- npm
- API .NET 10 executando em `http://localhost:5258`

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

A aplicação ficará disponível normalmente em:

`http://localhost:4200`

## CORS

Como o Angular e a API serão executados em portas diferentes, a API .NET precisa permitir CORS.

Exemplo no `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Angular");
```

A ordem deve respeitar o pipeline da sua aplicação, especialmente se houver autenticação/autorização.

## Estrutura

```text
src/
├── app/
│   ├── components/
│   │   └── usuario/
│   │       ├── usuario.component.html
│   │       ├── usuario.component.scss
│   │       └── usuario.component.ts
│   ├── models/
│   │   └── usuario.model.ts
│   ├── services/
│   │   └── usuario.service.ts
│   └── app.component.ts
├── index.html
├── main.ts
└── styles.scss
```

## Observação

O endpoint de atualização utilizado é:

`PUT http://localhost:5258/api/usuarios/{id}`

e o corpo enviado contém:

```json
{
  "id": 4,
  "nome": "Marcelo Silva",
  "email": "marcelo.silva@example.com",
  "ativo": "S",
  "perfil": "Administrador"
}
```

Para criação, o ID não é enviado.
