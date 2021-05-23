import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PatientListComponent implements OnInit {
  patients: Patient[];
  amount: number = 0;

  pageSize: number = 12;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  sourceFileUrlV1 = environment.sourceFileUrlV1;
  orderOptions: any[];
  constructor(private patientService: PatientService) {
    this.orderOptions = [
      {id: 'name', name: 'Nome'},
      {id: 'birthDate', name: 'Data de Nascimento'},
    ];
  }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.patientService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.patients = data.collection;
          this.patients.map(e => e.imagePath = this.sourceFileUrlV1 + e.imagePath);
          this.amount = data.amount;
        }
      )
  }

  errorHandler(event) {
    event.target.src = "/assets/images/patient.png";
 }
}
