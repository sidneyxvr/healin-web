import { PatientService } from './../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../models/patient';
import { VaccineDose } from '../models/vaccine-dose';
import { VaccineDoseService } from '../services/vaccine-dose.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.scss']
})
export class VaccineCardComponent implements OnInit {
  patient: Patient;
  patientId: string;

  doses: [string, VaccineDose[]];
  sourceFileUrlV1 = environment.sourceFileUrlV1;
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private vaccineDoseService: VaccineDoseService
    ) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patient-id');

    this.getPatient();

    this.get();
  }

  get(){
    this.vaccineDoseService.getByPatientId(this.patientId)
      .subscribe(
        data => {
          this.doses = data;
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
