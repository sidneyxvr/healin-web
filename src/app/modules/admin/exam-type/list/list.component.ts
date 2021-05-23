import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { ExamType } from './../../models/exam-type';
import { ExamTypeService } from './../../services/exam-type.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExamTypeListComponent implements OnInit {
  examTypes: ExamType[];
  amount: number;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;
  
  constructor(private examTypeService: ExamTypeService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.spinner.show();

    this.examTypeService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.examTypes = data.collection;
          this.amount = data.amount;
          this.spinner.hide();
        },
        (fail) => {
          this.spinner.hide();
        }
      )
  }

}
