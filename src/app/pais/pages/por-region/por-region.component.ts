import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {
  termino!: string;
  data!: any[];
  hayError: boolean = false;
  constructor(private paisService: PaisService) {}

  buscar() {
    this.hayError = false;
    this.data = [];
    this.paisService.searchByRegion(this.termino).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: () => {
        this.hayError = true;
      },
    });
  }
}
