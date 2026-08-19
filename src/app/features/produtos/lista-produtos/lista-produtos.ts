import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
import { inject} from "@angular/core";
import { CarrinhoFacade } from '../../../core/facades/carrinho.facades';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  // ========== SIGNALS ================
  produtos = signal<{nome: string; preco: number}[]>([]);

  carregando = signal(true);

  produtoSelecionado = signal <string | null>(null);

  erro = signal <string | null > (null);

  // ========== COMPUTED ================
  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0
)});

// ======== MÉTODO HTTP CLINT (API) ============

carregarProduto(){

this.erro.set(null); // Limpa o erro antes de buscar os produtos  
this.carregando.set(true); // Sinaliza que está carregando os produtos
this.produtosService.buscarProdutos().subscribe({
  next: (dados) => {
    const produtos = this.produtosService.transformarProdutos(dados);
    this.produtos.set(produtos);
    this.carregando.set(false);
  },
  error: (erro) => {
    console.error('Erro ao buscar produtos: ', erro);
    this.erro.set('Erro ao carregar produtos. Por favor, tente novamente!'); // Define o erro
    this.carregando.set(false);
  }
});
}

// ======== CONSTRUCTOR ================
constructor(){
    // Carrega a API
    this.carregarProduto();

    // Effects continuam iguais - não mexer
    effect(() =>{
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(() =>{
      console.log('Valor Total Atualizado: ', this. valorTotal());
    });
    effect(() =>{
      if (typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Carol`;
      }
    });
  }

  // ======== MÉTODO UPDATE ==============
   adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
   
   adicionarAoCarrinho(produto:{nome: string; preco: number}){
    this.carrinhoFacade.adicionarProdutoCarrinho(produto);
   }

  // ======== MÉTODO SET ===============
  substituirProdutos(){
    this.produtos.set([
      { nome:'Teclado', preco: 50 },
      { nome:'Mouse', preco: 15 },
      { nome:'Monitor', preco: 500 },
      { nome:'Desktop', preco: 1500 },
      { nome:'Headset', preco: 30 },
    ]);
  }

  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }  

// ======== INJECT =========

private produtosService = inject(produtosService);
public carrinhoFacade = inject(CarrinhoFacade);

quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalCarrinho = this.carrinhoFacade.totalCarrinho;

}