import { Injectable, signal, computed } from '@angular/core';
import { Produto } from '../models/produto';

export type Item = {
  id: number;
  produto: Produto;
  quantidade: number;
};

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private _itens = signal<Item[]>([]);

  itens = this._itens.asReadonly();

  total = computed(() =>
    this._itens().reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0)
  );

  adicionarItem(produto: Produto, quantidade: number = 1): void {
    this._itens.update(itens => {
      const existente = itens.find(item => item.produto.id === produto.id);

      if (existente) {
        return itens.map(item =>
          item.id === existente.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      const novoItem: Item = {
        id: this.gerarProximoId(itens),
        produto,
        quantidade
      };

      return [...itens, novoItem];
    });
  }

  aumentarQuantidade(itemId: number, quantidade: number = 1): void {
    this._itens.update(itens =>
      itens.map(item =>
        item.id === itemId
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      )
    );
  }

  diminuirQuantidade(itemId: number, quantidade: number = 1): void {
    this._itens.update(itens =>
      itens
        .map(item =>
          item.id === itemId
            ? { ...item, quantidade: item.quantidade - quantidade }
            : item
        )
        .filter(item => item.quantidade > 0)
    );
  }

  removerItem(itemId: number): void {
    this._itens.update(itens => itens.filter(item => item.id !== itemId));
  }

  obterTotal(): number {
    return this.total();
  }

  private gerarProximoId(itens: Item[]): number {
    return itens.length > 0 ? Math.max(...itens.map(i => i.id)) + 1 : 1;
  }
}
