import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Indicador {
  nome: string;
  valor: string;
  meta: string;
  detalhe: string;
  classe: 'cyan' | 'green' | 'amber' | 'violet';
}

interface Regiao {
  nome: string;
  populacao: string;
  renda: string;
  densidade: string;
  urbanizacao: string;
  idh: string;
  pib: string;
  destaque: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  readonly indicadores: Indicador[] = [
    {
      nome: 'População total',
      valor: '213,3M',
      meta: '+1,4% vs. ano anterior',
      detalhe: 'habitantes',
      classe: 'cyan'
    },
    {
      nome: 'Renda per capita',
      valor: 'R$ 39,8K',
      meta: '+6,2% em 2025',
      detalhe: 'por pessoa',
      classe: 'green'
    },
    {
      nome: 'Densidade',
      valor: '26 hab/km²',
      meta: 'maior concentração no Sudeste',
      detalhe: 'população por km²',
      classe: 'amber'
    },
    {
      nome: 'Urbanização',
      valor: '87,6%',
      meta: 'camadas urbanas em expansão',
      detalhe: 'da população',
      classe: 'violet'
    },
    {
      nome: 'IDH médio',
      valor: '0,766',
      meta: 'alto desenvolvimento humano',
      detalhe: 'índice nacional',
      classe: 'green'
    },
    {
      nome: 'PIB',
      valor: 'R$ 2,7T',
      meta: 'equivalente a 24 bilhôes',
      detalhe: 'em bilhões',
      classe: 'cyan'
    }
  ];

  readonly regioes: Regiao[] = [
    {
      nome: 'Sudeste',
      populacao: '89,1M',
      renda: 'R$ 54,2K',
      densidade: '95 hab/km²',
      urbanizacao: '94,8%',
      idh: '0,796',
      pib: 'R$ 1,2T',
      destaque: 'maior PIB e maior renda per capita'
    },
    {
      nome: 'Sul',
      populacao: '29,7M',
      renda: 'R$ 42,6K',
      densidade: '50 hab/km²',
      urbanizacao: '85,6%',
      idh: '0,774',
      pib: 'R$ 431,8B',
      destaque: 'excelente qualidade de vida e infraestrutura'
    },
    {
      nome: 'Nordeste',
      populacao: '57,2M',
      renda: 'R$ 23,4K',
      densidade: '37 hab/km²',
      urbanizacao: '77,9%',
      idh: '0,684',
      pib: 'R$ 306,1B',
      destaque: 'crescimento urbano com potencial de transformação'
    },
    {
      nome: 'Norte',
      populacao: '18,9M',
      renda: 'R$ 28,7K',
      densidade: '5 hab/km²',
      urbanizacao: '76,3%',
      idh: '0,692',
      pib: 'R$ 224,5B',
      destaque: 'baixa densidade e grande potencial territorial'
    },
    {
      nome: 'Centro-Oeste',
      populacao: '17,9M',
      renda: 'R$ 46,3K',
      densidade: '9 hab/km²',
      urbanizacao: '88,1%',
      idh: '0,757',
      pib: 'R$ 291,4B',
      destaque: 'forte crescimento agropecuário e urbano'
    }
  ];

  readonly ranking = [
    { nome: 'São Paulo', percentual: 100, pib: 'R$ 794B' },
    { nome: 'Rio de Janeiro', percentual: 82, pib: 'R$ 294B' },
    { nome: 'Minas Gerais', percentual: 75, pib: 'R$ 252B' },
    { nome: 'Paraná', percentual: 68, pib: 'R$ 216B' },
    { nome: 'Bahia', percentual: 61, pib: 'R$ 183B' }
  ];
}
