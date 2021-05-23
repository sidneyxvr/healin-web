import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { PatientService } from '../../services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[];
  amount: number = 0;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  sourceFileUrlV1 = environment.sourceFileUrlV1;
  orderOptions: any[];
  constructor(
    private patientService: PatientService, 
    private doctorService: DoctorService,
    private toastr: ToastrService,
    ) {
    this.orderOptions = [
      {id: 'name', name: 'Nome'}, 
      {id: 'crm', name: 'CRM'}, 
    ]
  }

  ngOnInit(): void {
    this.getPaged();  
  }

  getPaged(){
    this.doctorService.getPagedByPatientId(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.doctors = data.collection,
          this.amount = data.amount
        }
      )
  }

  changeDoctorPermission(id: string){
    let doctor = this.doctors.filter(d => d.id === id)[0];

    if(doctor == null){
      return;
    }

    if(doctor.marked){
      this.patientService.removeDoctorToMyDoctors(doctor.id)
        .subscribe(
          () => {
            doctor.marked = false;
            this.toastr.success("Removido com sucesso");
          },
          () => this.toastr.error("Falha ao remover")
        )
    }
    else{
      this.patientService.addDoctorToMyDoctors(id)
      .subscribe(
        () => {
          doctor.marked = true;
          this.toastr.success("Adicionado com sucesso");
        },
        () => this.toastr.error("Falha ao adicionar")
      )
    }
  }

  errorHandler(event) {
    event.target.src = "/assets/images/patient.png";
  }
}
