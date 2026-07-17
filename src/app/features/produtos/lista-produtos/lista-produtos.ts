import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
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
}