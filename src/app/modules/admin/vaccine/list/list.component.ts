import { Component, OnInit } from '@angular/core';

import { VaccineService } from './../../services/vaccine.service';
import { Vaccine } from '../../models/vaccine';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class VaccineListComponent implements OnInit {
  vaccines: Vaccine[];
  amount: number;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.vaccineService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.vaccines = data.collection,
          this.amount = data.amount
        }
      )
  }
}
