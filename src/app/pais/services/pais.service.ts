import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/porPais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ query }`
    return this.http.get<Country[]>( url )
  }

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ query }`
    return this.http.get<Country[]>( url )
  }

  searchByRegion(query: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ query }`
    return this.http.get<Country[]>( url )
  }
}
