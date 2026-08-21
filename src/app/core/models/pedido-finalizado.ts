import { ItemCarrinho } from "./item-carrinho"

export type PedidoFinalizado = {
    codigo: number;
    cliente: string;
    quantidadeItens: number;
    total: number;
    itens: ItemCarrinho[];
    email: string
}