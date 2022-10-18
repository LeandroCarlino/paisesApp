import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css'],
})
export class PaisInputComponent implements OnInit {
  query: string = '';
  @Input() placeholder: string = ''
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();

  ngOnInit() {
    this.debouncer.pipe(debounceTime(300)).subscribe(valor => {
      this.onDebounce.emit(valor)
    })  
  }

  search(): void {
    this.onEnter.emit(this.query)
  }

  pressKey(): void {
    this.debouncer.next(this.query)
  }
}
