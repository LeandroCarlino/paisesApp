import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {
  termino!: string;
  data!: any[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  buscar() {
    this.hayError = false;
    this.data = [];
    this.paisService.searchByCapital(this.termino).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: () => {
        this.hayError = true;
      },
    });
  }

}
