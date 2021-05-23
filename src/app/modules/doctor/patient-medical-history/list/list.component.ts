import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from './../../../../../environments/environment';
import { PatientService } from './../../services/patient.service';
import { ExamResultService } from '../../services/exam-result.service';
import { ExamResult } from '../../models/exam-result';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PatientMedicalHistoryListComponent implements OnInit {
  patientId: string;
  patient: Patient;

  examResults: ExamResult[];
  amount: number = 0;

  pageSize: number = 100;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;
  
  sourceFileUrlV1 = environment.sourceFileUrlV1;
  orderOptions: any[];
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private examResultService: ExamResultService,
  ) { 
    this.orderOptions = [{id: 'name', name: 'Nome'}];
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patient-id');

    this.getPatient();

    this.getPaged();
  }

  getPaged(){
    this.examResultService.getPagedByPatient(this.patientId, this.page, this.pageSize, this.search, this.filter, this.order)
      .subscribe(
        data => {
          this.examResults = data.collection;
          this.examResults.map(e => e.filePath = this.sourceFileUrlV1 + e.filePath),
          this.amount = data.amount
        }
      )
  }

  getPatient(){
    this.patientService.getById(this.patientId)
      .subscribe(
        data => { 
          this.patient = data;
          this.patient.imagePath = this.sourceFileUrlV1 + this.patient.imagePath;
        }
      );
  }

  errorHandler(event) {
    event.target.src = "/assets/images/patient.png";
  }
}
