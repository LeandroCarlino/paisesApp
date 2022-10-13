import { Component } from '@angular/core';
import { Country } from '../../interfaces/porPais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent {
  query!: string;
  countries!: Country[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  search(query: string) {
    this.hayError = false;
    this.countries = [];
    this.query = query;
    this.paisService.searchByCountry(this.query).subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: () => {
        this.hayError = true;
      },
    });
  }

  suggestion(termino: string) {
    this.hayError = false;
    
  }
}
