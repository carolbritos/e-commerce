import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facades';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  carrinhoFacade = inject(CarrinhoFacade);

  compraFinalizada = signal(false);

  formulario = new FormGroup({
    nome: new FormControl('',[Validators.required, Validators.minLength(2), nomeSemNumeros]),
    email: new FormControl('',[Validators.required, Validators.email]),
    endereco: new FormControl('',[Validators.required, Validators.minLength(5)]),
  });
item: any;

  finalizar(){

    this.compraFinalizada.set(false);

    if(this.carrinhoFacade.carrinhoVazio()){
      console.log('Não é possível finalizar a compra com o carrinho vazio!');
      return;
    }

    if(this.formulario.invalid){
      console.log('Formulário Inválido!');
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.value;
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();

    console.log('Compra Finalizada com Sucesso!');
    console.log('Dados do Fomulário: ', dados);
    console.log('Itens no Carrinho: ', itens);
    console.log('Total de compras: ', total);

    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.compraFinalizada.set(true);
  }
}
function nomeSemNumeros(controle: AbstractControl): ValidationErrors | null {
  const valor = controle.value;
  if (!valor) return null;
  if(/\d/.test(valor)){
    return { numeroInvalido:true};
  }
  return null;
}