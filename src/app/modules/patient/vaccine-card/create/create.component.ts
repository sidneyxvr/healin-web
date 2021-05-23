import { VaccineService } from './../../../admin/services/vaccine.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { SelectItem } from './../../../../utils/select-item';
import { VaccineDoseService } from './../../services/vaccine-dose.service';
import { VaccineDose } from './../../models/vaccine-dose';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class VaccineCardCreateComponent implements OnInit {
  loading: boolean;

  createForm: FormGroup;
  vaccineDose: VaccineDose;
  date = new Date();

  doseTypes: SelectItem[];
  vaccines: SelectItem[];

  constructor(
    private vaccineDoseService: VaccineDoseService, 
    private bsLocaleService: BsLocaleService,
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    ) { 
      this.bsLocaleService.use('pt-br');
    }

  ngOnInit(): void {
    this.vaccineService.get()
      .subscribe(
        data => this.vaccines = data
      )

    this.vaccineDoseService.getDoseTypes()
        .subscribe(
          data => this.doseTypes = data
        )

    this.createForm = this.fb.group({
      doseDate: [null, [Validators.required]],
      doseType: [null, [Validators.required]],
      vaccineId: [null, [Validators.required]]
    })
  }

  onSubmit(){
    if(this.createForm.invalid){
      return;
    }

    this.loading = true;

    this.vaccineDose = this.createForm.value;
    this.vaccineDoseService.add(this.vaccineDose)
      .subscribe(
        () => {
          this.router.navigate(['patient/vaccine-card/list'])
            .then(() => this.toastr.success('Cadastrado com sucesso'));
        },
        fail => {
          for (const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        }
      )
  }
}
