import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale); 

import { SpecialtyService } from './../../../admin/services/specialty.service';
import { Prescription } from '../../models/prescription';
import { FormBaseComponent } from 'src/app/utils/form-base';
import { SelectItem } from 'src/app/utils/select-item';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class PrescriptionEditComponent implements OnInit {
  loading: boolean;
  
  prescription: Prescription;
  editForm: FormGroup;
  date = new Date();

  prescriptionId: string;

  specialties: SelectItem[];
  prescriptionTypes: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bsLocaleService: BsLocaleService,
    private specialtyService: SpecialtyService,
    private prescriptionService: PrescriptionService,
    ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit(): void {
    this.prescriptionId = this.route.snapshot.paramMap.get('id');

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
        } 
      )

    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prescriptionDate: ['', [Validators.required]],
      specialtyId: [null, [Validators.required]],
      prescriptionType: [null, [Validators.required]],
    });

    this.getById();
  }

  getById(){
    this.prescriptionService.getById(this.prescriptionId)
      .subscribe(
        data => {
          this.prescription = data;
          this.fillForm();
        } 
      )
  }

  fillForm(){
    this.editForm.patchValue({
      id: this.prescription.id,
      description: this.prescription.description,
      prescriptionDate: new Date(this.prescription.prescriptionDate),
      specialtyId: this.prescription.specialtyId,
      prescriptionType: this.prescription.prescriptionType.toString()
    })
  }

  onSubmit(){
    this.loading = true;
    this.prescription = this.editForm.value;

    this.prescriptionService.update(this.prescription)
      .subscribe(
        () => {
          this.router.navigate(['/patient/prescription/list'])
            .then(() => this.toastr.success('Atualizado com sucesso'))
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
