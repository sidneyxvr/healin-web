import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Exam } from '../../models/exam';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExamListComponent implements OnInit {
  exams: Exam[];
  amount: number;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;
  
  constructor(private examService: ExamService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.spinner.show();

    this.examService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.exams = data.collection;
          this.amount = data.amount;
          this.spinner.hide();
        },
        (fail) => {
          console.log(fail);
          this.spinner.hide();
        }
      )
  }

}
