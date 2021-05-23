import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchChange = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() orderChange = new EventEmitter<string>();
  @Output() get = new EventEmitter<string>();

  @Input() orderItems: any[];
  
  @Input() search: string;
  @Input() pageSize: number;
  @Input() order: string;
  @Input() createRouter: string = '';

  ngOnInit(): void {
  }

  constructor() { }

  searched(){
    this.searchChange.emit(this.search);
    this.get.emit();
  }

  pageSizeChanged(){
    this.pageSizeChange.emit(this.pageSize);
    this.get.emit();
  }

  orderChanged(){
    this.orderChange.emit(this.order);
    this.get.emit();
  }
}
