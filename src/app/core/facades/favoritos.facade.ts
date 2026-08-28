import { Injectable, inject } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosFacade {
  private favoritosService = inject(FavoritosService);

  favoritos = this.favoritosService.favoritosSalvos;
  quantidadeFavoritos = this.favoritosService.quantidadeFavoritos;

  adicionarFavorito(nome: string) {
    this.favoritosService.adicionarFavorito(nome);
  }

  removerFavorito(nome: string) {
    this.favoritosService.removerFavorito(nome);
  }

  estaFavoritado(nome: string): boolean {
    return this.favoritosService.estaFavoritado(nome);
  }
}