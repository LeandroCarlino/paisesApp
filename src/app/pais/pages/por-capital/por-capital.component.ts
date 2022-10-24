import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css'],
})
export class PorCapitalComponent {
  query!: string;
  data!: any[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  search(query: string) {
    this.hayError = false;
    this.data = [];
    this.query = query;
    this.paisService.searchByCapital(this.query).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: () => {
        this.hayError = true;
      },
    });
  }

  suggestion(query: string) {
    this.hayError = false;
  }
}
