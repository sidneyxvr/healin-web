import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ngx-custom-validators';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 

import { AuthService } from './../services/auth.service';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-register',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {
  errors: any[] = [];
  registerForm: FormGroup;
  patient: Patient;
  loading: boolean = false;

  MASKS = utilsBr.MASKS;  
  step: number = 1;
  profile: number = 0;
  selectedCompanies;
  genders: any[];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private bsLocaleService: BsLocaleService, 
    private toastr: ToastrService,
    ) { 
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.genders = [{id: 1, name: 'Masculino'}, {id: 2, name: 'Feminino'}];

    let _password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let _confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(_password)]);

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.rangeLength([5, 50])]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      gender: [null, [Validators.required]],
      phone: ['', [Validators.required, NgBrazilValidators.telefone]],
      birthDate: ['', Validators.required],
      susNumber: [''],
      password: _password,
      confirmPassword: _confirmPassword
    })
  }


  onSubmit() {
    if(this.registerForm.invalid){
      return;
    }
    this.loading = true;

    this.patient = this.registerForm.value;
    this.patient.cpf = this.patient.cpf.replace(/[.-]/g,'');
    this.patient.phone = this.patient.phone.replace(/[()-\s]/g,'');
    this.authService.registerPatient(this.patient)
      .subscribe(
        () => {
          this.router.navigate(['/auth/login'])
            .then(() => this.toastr.success('Cadastrado com sucesso'));
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
