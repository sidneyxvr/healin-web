import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() pageSize: number;
  @Input() collectionSize: number;

  @Output() getPaged = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  shown: number;

  constructor() { }

  ngOnInit(): void {
    this.shown = Math.min((this.page * this.pageSize), this.collectionSize);
  }

  get(): void {
    this.shown = Math.min((this.page * this.pageSize), this.collectionSize);

    this.pageChange.emit(this.page);
    this.getPaged.emit();
  }
}
