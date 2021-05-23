import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ngx-custom-validators';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale); 

import { AuthService } from '../services/auth.service';
import { Doctor } from '../models/doctor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {
  errors: any[] = [];
  registerForm: FormGroup;
  doctor: Doctor;
  loading: boolean = false;

  MASKS = utilsBr.MASKS;  
  step: number = 1;
  profile: number = 0;
  selectedCompanies;
  genders;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService,
    private bsLocaleService: BsLocaleService) { 
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
      crm: ['', [Validators.required, Validators.maxLength(10)]],
      password: _password,
      confirmPassword: _confirmPassword
    })
  }

  onSubmit() {
    if(this.registerForm.invalid){
      return;
    }
    this.loading = true;

    this.doctor = this.registerForm.value;
    this.doctor.cpf = this.doctor.cpf.replace(/[.-]/g,'');
    this.doctor.phone = this.doctor.phone.replace(/[()-\s]/g,'');
    this.authService.registerDoctor(this.doctor)
      .subscribe(
        () => {
          this.router.navigate(['/auth/login'])
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
