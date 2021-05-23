import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { PrescriptionService } from './../../services/prescription.service';
import { SpecialtyService } from './../../../admin/services/specialty.service';
import { SelectItem } from './../../../../utils/select-item';
import { Prescription } from './../../models/prescription';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class PrescriptionCreateComponent implements OnInit {  
  loading: boolean;
  prescription: Prescription;
  createForm: FormGroup;
  date = new Date();

  specialties: SelectItem[];
  prescriptionTypes: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private specialtyService: SpecialtyService,
    private prescriptionService: PrescriptionService,
    private bsLocaleService: BsLocaleService
    ) {
      this.bsLocaleService.use('pt-br');
  }


  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.specialtyService.get()
      .subscribe(
        data => {
          this.specialties = data;
        }
      )

    this.prescriptionService.getPrescriptionTypes()
      .subscribe(
        data => {
          this.prescriptionTypes = data;
          console.log(this.prescriptionTypes);
        } 
      )

    this.createForm = this.fb.group({
      description: ['', [Validators.required]],
      prescriptionDate: ['', [Validators.required]],
      specialtyId: [null, [Validators.required]],
      prescriptionType: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.loading = true;
    const form = new FormData();

    for(let i = 0; i < this.files.length; i++){
      form.append(i.toString(), this.files[i]);
    }

    this.prescription = this.createForm.value;
    form.append('description', this.prescription.description);
    form.append('prescriptionDate', this.prescription.prescriptionDate.toLocaleDateString());
    form.append('specialtyId', this.prescription.specialtyId);
    form.append('prescriptionType', this.prescription.prescriptionType.toString());

    for(let i = 0; i < this.files.length; i++){
      form.append(i.toString(), this.files[i]);
    }

    this.prescriptionService.add(form)
      .subscribe(
        () => {
          this.router.navigate(['/patient/prescription/list'])
            .then(() => this.toastr.success('Cadastrado com sucesso'))
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        }
      )
  }

}
