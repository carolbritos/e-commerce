import { Component,Input,Output,EventEmitter } from '@angular/core';
  import{ UpperCasePipe, CurrencyPipe } from '@angular/common';
  import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  //Entrada de dados da lista Produtps em lista-proutos
  @Input() nome: string ='';
  @Input() preco: number = 0;
  //Saída de dados de Produtos selecionados para lista-produtos
  @Output() produtoSelecionado = new EventEmitter<string>();
  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }
}
