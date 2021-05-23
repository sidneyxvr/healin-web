import { Specialty } from './../../models/specialty';
import { Component, OnInit } from '@angular/core';
import { SpecialtyService } from '../../services/specialty.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SpecialtyListComponent implements OnInit {
  specialties: Specialty[];
  amount: number;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;
  
  constructor(private specialtyService: SpecialtyService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.spinner.show();

    this.specialtyService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.specialties = data.collection;
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
