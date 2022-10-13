import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {
  query!: string;
  countries!: any[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  search(query: string) {
    this.hayError = false;
    this.countries = [];
    this.query = query;
    this.paisService.searchByRegion(this.query).subscribe({
      next: (countries) => {
        this.countries = countries;
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
