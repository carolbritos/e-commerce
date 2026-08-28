import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosFacade } from '../../../core/facades/favoritos.facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-favoritos',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './lista-favoritos.html',
  styleUrl: './lista-favoritos.css',
})
export class ListaFavoritos {
  public favoritosFacade = inject(FavoritosFacade);

  removerFavorito(nome: string) {
    this.favoritosFacade.removerFavorito(nome);
  }
}