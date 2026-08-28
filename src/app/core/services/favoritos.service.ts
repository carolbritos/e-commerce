import { isPlatformBrowser } from '@angular/common';
import { Injectable, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { Favorito } from '../models/favorito';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private platformId = inject(PLATFORM_ID);

  private readonly chaveStorage = 'minha-loja-favoritos';

  private favoritos = signal<Favorito[]>(this.carregarFavoritosSalvos());

  favoritosSalvos = computed(() => this.favoritos());

  quantidadeFavoritos = computed(() => this.favoritos().length);

  constructor() {
    effect(() => {
      this.salvarFavoritos(this.favoritos());
    });
  }

  adicionarFavorito(nome: string) {
    const jaFavoritado = this.favoritos().some(
      (favorito) => favorito.nome === nome
    );

    if (jaFavoritado) {
      return;
    }

    this.favoritos.update((lista) => [
      ...lista,
      { nome },
    ]);
  }

  removerFavorito(nome: string) {
    this.favoritos.update((lista) =>
      lista.filter((favorito) => favorito.nome !== nome)
    );
  }

  estaFavoritado(nome: string): boolean {
    return this.favoritos().some(
      (favorito) => favorito.nome === nome
    );
  }

  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private carregarFavoritosSalvos(): Favorito[] {
    if (!this.estaNoNavegador()) {
      return [];
    }

    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (!dadosSalvos) {
      return [];
    }

    try {
      return JSON.parse(dadosSalvos) as Favorito[];
    } catch {
      return [];
    }
  }

  private salvarFavoritos(favoritos: Favorito[]) {
    if (!this.estaNoNavegador()) {
      return;
    }

    localStorage.setItem(
      this.chaveStorage,
      JSON.stringify(favoritos)
    );
  }
}