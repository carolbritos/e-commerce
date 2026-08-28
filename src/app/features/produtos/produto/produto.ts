import { Component,Input,Output,EventEmitter, inject } from '@angular/core';
  import{ UpperCasePipe, CurrencyPipe } from '@angular/common';
  import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { ItemCarrinho } from '../../../core/models/item-carrinho';
  import { FavoritosFacade } from '../../../core/facades/favoritos.facade';
  
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule],
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
  @Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();
  adicionarAoCarrinho() {
    this.produtoAdicionado.emit({
      nome: this.nome,
      preco: this.preco,
    });
  }

private favoritosFacade = inject(FavoritosFacade);

favoritar() {
  if (this.favoritosFacade.estaFavoritado(this.nome)) {
    this.favoritosFacade.removerFavorito(this.nome);
  } else {
    this.favoritosFacade.adicionarFavorito(this.nome);
  }
}

estaFavoritado(): boolean {
  return this.favoritosFacade.estaFavoritado(this.nome);
}

}


