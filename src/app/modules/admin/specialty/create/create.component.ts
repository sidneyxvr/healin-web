import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Specialty } from './../../models/specialty';
import { FormBaseComponent } from 'src/app/utils/form-base';
import { SpecialtyService } from '../../services/specialty.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class SpecialtyCreateComponent implements OnInit {
  loading: boolean = false;

  errors: any[] = [];
  createForm: FormGroup;
  specialty: Specialty;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private specialtyService: SpecialtyService, 
    private toastr: ToastrService
    ) {
   }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if(this.createForm.invalid){
      return;
    }
    this.loading = true;

    this.specialty = this.createForm.value;
    
    this.specialtyService.add(this.specialty)
      .subscribe(
        () => {
          this.router.navigate(['/admin/specialty/list'])
            .then(() => this.toastr.success("Cadastrado com Sucesso"))
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
        }
      )
  }
}
