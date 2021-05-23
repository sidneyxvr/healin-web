import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Vaccine } from './../../models/vaccine';
import { VaccineService } from './../../services/vaccine.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class VaccineCreateComponent implements OnInit {
  loading: boolean = false;

  createForm: FormGroup;
  vaccine: Vaccine;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private vaccineService: VaccineService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.createForm.invalid){
      return;
    }

    this.loading = true;

    this.vaccine = this.createForm.value;
    this.vaccineService.add(this.vaccine)
      .subscribe(
        () => {
          this.router.navigate(['/admin/vaccine/list'])
            .then(() => this.toastr.success("Cadastrado com Sucesso"));
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
