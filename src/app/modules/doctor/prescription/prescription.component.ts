import { Patient } from './../models/patient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Prescription } from '../models/prescription';
import { PrescriptionService } from '../services/prescription.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  patient: Patient;
  patientId: string;

  prescriptions: Prescription[];
  amount: number = 0;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  sourceFileUrlV1 = environment.sourceFileUrlV1;
  orderOptions: any[];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private prescriptionService: PrescriptionService,
  ) { 
    this.orderOptions = [
      {id: 'description', name: 'Descrição'}, 
      {id: 'especialidade', name: 'Especialidade'},
      {id: 'prescriptionDate', name: 'Data da Consulta'},
    ]
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patient-id');

    this.getPatient();

    this.getPaged();
  }

  getPaged(){
    this.prescriptionService.getPaged(this.patientId, this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.prescriptions = data.collection;
          this.prescriptions.map(a => a.filePath = environment.sourceFileUrlV1 + a.filePath)
          this.amount = data.amount;
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
