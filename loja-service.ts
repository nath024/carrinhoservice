import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Service()
export class LojaService {
    API = 'http://localhost:3000'

    #http = inject(HttpClient)

    obterProdutos(): Observable<Produto[]> {
        return this.#http.get<Produto[]>(`${this.API}/produtos`)
    }

    /** Devolve um produto dado o seu id 
     * 
     * @param prodId o id do produto
     * @returns Um Observable de produto Observable<Produto>
    */
    obterProdutoPorId(prodId: number): Observable<Produto> {
        return this.#http.get<Produto>(`${this.API}/produtos/${prodId}`)
    }
}
