import { PatientService } from './../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { AddressReponse } from '../models/address-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ViaCepService } from '../services/via-cep.service';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { State } from 'src/app/constats/state';
import { DoctorService } from '../services/doctor.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Address } from '../models/address';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  role: string;
  loading: boolean = false;
  public MASKS = MASKS;
  
  states: string[];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {
    this.states = State.getStates();
    this.role = this.localStorageUtils.getUser()?.claims?.filter(a => a.type === 'role')[0]?.value;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(50)]],
      number: ['', [Validators.required, Validators.maxLength(5)]],
      district: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(40)]],
      state: [null, [Validators.required]],
      postalCode: ['', [Validators.required, NgBrazilValidators.cep]],
      complement: ['', [Validators.maxLength(50)]],
    })
    let address: Address;
    if(this.role === 'Patient'){
      this.patientService.getAddress()
        .subscribe(
          data => {
            this.fillFormFromRequest(data)
          }
        )
    }else if(this.role === 'Doctor'){
      this.doctorService.getAddress()
        .subscribe(
          data => {
            this.fillFormFromRequest(data)
          }
        )
    }
  }

  onSubmit(){
    let address = this.form.value as Address;
    address.postalCode = address.postalCode.replace(/\D/g,'');

    this.loading = true;

    if(this.role === 'Patient'){
      this.patientService.updateAddress(address)
        .subscribe(
          () => {
            this.toastr.success('Alterado com sucesso');
          },
          fail => {
            for(const error of fail.error){
              this.toastr.error(error);
            }
            this.loading = false;
          }
        );
    }else if(this.role === 'Doctor'){
      this.doctorService.updateAddress(address)
      .subscribe(
        () => {
          this.toastr.success('Alterado com sucesso');
          this.loading = false;
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        }
      );
    }else{
      this.loading = false;
    }
  }

  getAddressByPostalCode($event){
    let postalCode = $event.target.value.replace(/\D/g,'');

    if(postalCode.length != 8){
      return;
    }

    this.viaCepService.getAddress(postalCode)
      .subscribe(
        data => {
          this.fillForm(data)
        },
        () => {
          this.toastr.error('Não foi possível localizar o endereço');
        }
      )
  }

  fillForm(address: AddressReponse){
    this.form.patchValue({
      street: address.logradouro,
      district: address.bairro,
      city: address.localidade,
      state: address.uf,
      postalCode: address.cep,
      complement: address.complemento
    })
  }

  fillFormFromRequest(address: Address){
    this.form.patchValue({
      street: address.street,
      district: address.district,
      city: address.city,
      number: address.number,
      state: address.state,
      postalCode: address.postalCode,
      complement: address.complement
    })
  }
}
