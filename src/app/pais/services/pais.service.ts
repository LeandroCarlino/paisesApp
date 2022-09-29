import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/porPais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  api: string = 'https://restcountries.com/v2/name/'

  constructor(private http: HttpClient) { }

  buscar(termino: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.api + termino)
  }
}
