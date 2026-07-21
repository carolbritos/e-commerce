import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe,],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!Lista com dados - Array
  produtos = signal( [
    {nome:'Teclado Gamer', preco:229.99},
    {nome:'Mouse Gamer', preco:129.99},
    {nome:'Monitor Gamer', preco:2000},
    {nome:'Desktop Gamer', preco:4999.99},
    {nome:'Headset Gamer', preco:500}
  ]);
  //!Função para exibir produtos selecionados pelo usuario no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  //!Função que adicionar produto usando metodo update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!Função que contabiliza a quantidade de produtos na lista com metodo computed()
  totalProdutos = computed(() => this.produtos().length);
  //!Função que calcula o valor total do produtos usando metodo computed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
  //!Função para substutuir a lista atual usando o metodo ser()
  substituirProdutos(){
    this.produtos.set([
      { nome:'Teclado', preco: 50 },
      { nome:'Mouse', preco: 15 },
      { nome:'Monitor', preco: 500 },
      { nome:'Desktop', preco: 1500 },
      { nome:'Headset', preco: 30 },
    ]);
  }
  //! Metodo para monitorar alteralções em tempo real usando effect()
  constructor(){
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
  //! Metodo para criar um estado se seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
  //! Metodo para criar um estado para carrinho com signal
  carrinho = signal <{nome: string; preco: number}[]>([]);
  adicionarAoCarrinho(produto:{nome: string; preco: number}){
    this.carrinho.update(listaAtual => [...listaAtual,produto]
    );
  }
  //!totalProdutos = computed(() => this.produtos().length);
  //metodo para calcular a quantidade total de itens no carrinho
  quantidadeCarrinho = computed(()=> this.carrinho().length);
  //metodo para calcular o valor total dos itens do carrinho
  totalCarrinho = computed(() =>{
    return this.carrinho().reduce((total,item) =>
      total + item.preco,0)});
}