import { Component,Input,Output,EventEmitter } from '@angular/core';
  import{ UpperCasePipe, CurrencyPipe } from '@angular/common';
  import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  @Input() nome: string ='';
  @Input() preco: number = 0;
}
