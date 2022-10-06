import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/porPais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  apiByCountry: string = 'https://restcountries.com/v2/name/'
  apiByCapital: string = 'https://restcountries.com/v3.1/capital/'
  apiByRegion: string = 'https://restcountries.com/v3.1/region/'

  constructor(private http: HttpClient) { }

  searchByCountry(query: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiByCountry + query)
  }

  searchByCapital(query: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiByCapital + query)
  }

  searchByRegion(query: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiByRegion + query)
  }
}
