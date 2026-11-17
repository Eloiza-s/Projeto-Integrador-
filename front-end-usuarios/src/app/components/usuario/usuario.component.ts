import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estado } from '../../models/estado.model';
import { Usuario, UsuarioRequest } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { EstadoService } from '../../services/estado.service';
import { UsuarioService } from '../../services/usuario.service';

interface Indicador {
  nome: string;
  valor: string;
  meta: string;
  detalhe: string;
  classe: 'cyan' | 'green' | 'amber' | 'violet';
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  private readonly estadoService = inject(EstadoService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly authService = inject(AuthService);

  readonly perfis = ['Administrador', 'Operador'];
  readonly regioes = ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
  readonly regiaoPorSigla: Record<string, string> = {
    RN: 'Nordeste',
    SP: 'Sudeste',
    RJ: 'Sudeste',
    BA: 'Nordeste',
    AM: 'Norte'
  };

  readonly indicadores: Indicador[] = [
    { nome: 'População total', valor: '213,3M', meta: '+1,4% vs. ano anterior', detalhe: 'habitantes', classe: 'cyan' },
    { nome: 'Renda per capita', valor: 'R$ 39,8K', meta: '+6,2% em 2025', detalhe: 'por pessoa', classe: 'green' },
    { nome: 'Densidade', valor: '26 hab/km²', meta: 'maior concentração no Sudeste', detalhe: 'população por km²', classe: 'amber' },
    { nome: 'Urbanização', valor: '87,6%', meta: 'camadas urbanas em expansão', detalhe: 'da população', classe: 'violet' },
    { nome: 'IDH médio', valor: '0,766', meta: 'alto desenvolvimento humano', detalhe: 'índice nacional', classe: 'green' },
    { nome: 'PIB', valor: 'R$ 2,7T', meta: 'equivalente a 24 bilhôes', detalhe: 'em bilhões', classe: 'cyan' }
  ];

  estados: Estado[] = [];
  usuarios: Usuario[] = [];
  filtroTexto = '';
  filtroRegiao = 'Todas';
  filtroAtivo = 'todos';
  carregando = false;
  mensagem = '';
  tipoMensagem: 'success' | 'error' | 'info' = 'info';
  modoEdicao = false;
  usuarioEdicaoId: number | null = null;
  form: UsuarioRequest = { nome: '', email: '', senha: '', ativo: 'S', perfil: 'Operador' };

  readonly ranking = [
    { nome: 'São Paulo', percentual: 100, pib: 'R$ 794B' },
    { nome: 'Rio de Janeiro', percentual: 82, pib: 'R$ 294B' },
    { nome: 'Minas Gerais', percentual: 75, pib: 'R$ 252B' },
    { nome: 'Paraná', percentual: 68, pib: 'R$ 216B' },
    { nome: 'Bahia', percentual: 61, pib: 'R$ 183B' }
  ];

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarUsuarios();
  }

  get estadosFiltrados(): Estado[] {
    return this.estados.filter((estado) => {
      const textoOk = !this.filtroTexto ||
        estado.nome.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        estado.sigla.toLowerCase().includes(this.filtroTexto.toLowerCase());

      const regiao = this.regiaoPorSigla[estado.sigla] ?? 'Outros';
      const regiaoOk = this.filtroRegiao === 'Todas' || regiao === this.filtroRegiao;

      return textoOk && regiaoOk;
    });
  }

  get usuariosFiltrados(): Usuario[] {
    const termo = this.filtroTexto.trim().toLowerCase();

    return this.usuarios.filter((usuario) => {
      const passaTexto = !termo ||
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.email.toLowerCase().includes(termo) ||
        usuario.perfil.toLowerCase().includes(termo);

      const passaStatus = this.filtroAtivo === 'todos' || usuario.ativo === this.filtroAtivo;

      return passaTexto && passaStatus;
    });
  }

  get perfilAtual(): string {
    return this.authService.getUserProfile();
  }

  get usuarioLogadoNome(): string {
    return this.authService.getUserName();
  }

  get podeGerenciarUsuarios(): boolean {
    return this.authService.isAdmin();
  }

  carregarEstados(): void {
    this.estadoService.listar().subscribe({
      next: (dados) => {
        this.estados = dados;
      },
      error: () => {
        this.estados = [];
      }
    });
  }

  carregarUsuarios(): void {
    this.carregando = true;
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.mensagem = 'Não foi possível carregar usuários.';
        this.tipoMensagem = 'error';
      }
    });
  }

  prepararNovoUsuario(): void {
    this.modoEdicao = false;
    this.usuarioEdicaoId = null;
    this.form = { nome: '', email: '', senha: '', ativo: 'S', perfil: 'Operador' };
  }

  editarUsuario(usuario: Usuario): void {
    this.modoEdicao = true;
    this.usuarioEdicaoId = usuario.id;
    this.form = {
      nome: usuario.nome,
      email: usuario.email,
      senha: '',
      ativo: usuario.ativo,
      perfil: usuario.perfil
    };
  }

  salvarUsuario(): void {
    if (!this.form.nome || !this.form.email) {
      this.mensagem = 'Nome e e-mail são obrigatórios.';
      this.tipoMensagem = 'error';
      return;
    }

    if (!this.modoEdicao && (!this.form.senha || this.form.senha.length < 4)) {
      this.mensagem = 'Para criar usuário, a senha deve ter pelo menos 4 caracteres.';
      this.tipoMensagem = 'error';
      return;
    }

    if (this.modoEdicao && this.usuarioEdicaoId !== null) {
      const payload: Usuario = {
        id: this.usuarioEdicaoId,
        nome: this.form.nome,
        email: this.form.email,
        ativo: this.form.ativo,
        perfil: this.form.perfil,
        senha: this.form.senha || undefined
      };

      this.usuarioService.atualizar(this.usuarioEdicaoId, payload).subscribe({
        next: () => {
          this.mensagem = 'Usuário atualizado com sucesso.';
          this.tipoMensagem = 'success';
          this.prepararNovoUsuario();
          this.carregarUsuarios();
        },
        error: () => {
          this.mensagem = 'Erro ao atualizar usuário.';
          this.tipoMensagem = 'error';
        }
      });
      return;
    }

    this.usuarioService.criar(this.form).subscribe({
      next: () => {
        this.mensagem = 'Usuário criado com sucesso.';
        this.tipoMensagem = 'success';
        this.prepararNovoUsuario();
        this.carregarUsuarios();
      },
      error: () => {
        this.mensagem = 'Erro ao salvar usuário.';
        this.tipoMensagem = 'error';
      }
    });
  }

  excluirUsuario(id: number): void {
    if (!confirm('Deseja realmente excluir este usuário?')) {
      return;
    }

    this.usuarioService.excluir(id).subscribe({
      next: () => {
        this.mensagem = 'Usuário removido com sucesso.';
        this.tipoMensagem = 'success';
        this.carregarUsuarios();
      },
      error: () => {
        this.mensagem = 'Erro ao excluir usuário.';
        this.tipoMensagem = 'error';
      }
    });
  }

  exportarCsv(): void {
    if (!this.usuariosFiltrados.length) {
      this.mensagem = 'Não há registros para exportar.';
      this.tipoMensagem = 'info';
      return;
    }

    const cabecalho = ['Nome', 'E-mail', 'Perfil', 'Status'];
    const linhas = this.usuariosFiltrados.map((usuario) => [usuario.nome, usuario.email, usuario.perfil, usuario.ativo === 'S' ? 'Ativo' : 'Inativo']);
    const csv = [cabecalho, ...linhas].map((linha) => linha.map((campo) => `"${String(campo).replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'usuarios.csv';
    link.click();
    URL.revokeObjectURL(url);

    this.mensagem = 'Arquivo CSV exportado com sucesso.';
    this.tipoMensagem = 'success';
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(value);
  }

  statusTexto(ativo: 'S' | 'N'): string {
    return ativo === 'S' ? 'Ativo' : 'Inativo';
  }
}

