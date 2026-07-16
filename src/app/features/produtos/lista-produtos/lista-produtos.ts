import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = [
    {nome:'Teclado Gamer', preco:229.99},
    {nome:'Mouse Gamer', preco:129.99},
    {nome:'Monitor Gamer', preco:2000},
    {nome:'Desktop Gamer', preco:4999.99},
    {nome:'Headset Gamer', preco:500}
  ];
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
  }
}
