import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { UserService } from './../services/user.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: User;
  imageSrc: any;
  imagem: File;
  loading: boolean = false;
  MASKS = utilsBr.MASKS;  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageName: string = '';
  showCropper: Boolean = false;

  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  role: string;
  sourceFileUrlV1 = environment.sourceFileUrlV1;
  
  form: FormGroup;
  genders: any[];
  constructor(
    private fb: FormBuilder,
    private bsLocaleService: BsLocaleService,
    private userService: UserService, 
    private doctorService: DoctorService,
    private patientService: PatientService,
    private toastr: ToastrService,
  ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      birthDate: [null, [Validators.required]],
      phone: ['', [NgBrazilValidators.telefone]],
      email: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      crm: [null],
      susNumber: [null]
    })

    this.role = this.localStorageUtils.getUser()?.claims?.filter(a => a.type === 'role')[0]?.value;

    this.genders = [{id: 1, name: 'Masculino'}, {id: 2, name: 'Feminino'}];

    if(this.role === 'Doctor'){
      this.form.get('crm').setValidators([Validators.required]);
    }

    this.getUserInfo();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event.target.value);
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.imageSrc = this.croppedImage;
  }
  imageLoaded() {
      this.showCropper = true;
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    let imageFile: Blob = null;
    if(this.croppedImage){
      imageFile = base64ToFile(this.croppedImage)
    }

    this.user = this.form.value;
    this.loading = true;
    this.user.cpf = this.user.cpf.replace(/\D/g,'');
    this.user.phone = this.user.phone.replace(/\D/g,'');

    const formData = new FormData();
    formData.append('imageUpload', imageFile);
    formData.append('id', this.user.id);
    formData.append('cpf', this.user.cpf);
    formData.append('birthDate', new Date(this.user.birthDate).toDateString());
    formData.append('phone', this.user.phone);
    formData.append('name', this.user.name);
    formData.append('gender', this.user.gender.toString());

    if(this.role === 'Doctor'){
      formData.append('crm', this.user.crm);
      this.doctorService.update(formData)
        .subscribe(
          () => {
            this.toastr.success("Atualizado com sucesso");
            this.loading = false;
          },
          fail => {
            for(const error of fail.error){
              this.toastr.error(error);
              this.loading = false;
            }
          }
        );
    }
    else if(this.role === 'Patient'){
      formData.append('susNumber', this.user.susNumber);
      this.patientService.update(formData)
        .subscribe(
          () => {
            this.toastr.success("Atualizado com sucesso");
            this.loading = false;
          },
          fail => {
            for(const error of fail.error){
              this.toastr.error(error);
              this.loading = false;
            }
          }
        );
    }
  }

  getUserInfo(){
    this.userService.getUserInfo()
      .subscribe(
        data => {
          this.user = data;
          this.imageSrc = this.sourceFileUrlV1 + this.user.imagePath;
          this.fillForm(this.user);
        }
      )
  }

  fillForm(user: User){
    this.form.patchValue({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      birthDate: new Date(user.birthDate).toLocaleDateString(),
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      crm: user.crm,
      susNumber: user.susNumber
    })
  }

  abrirBuscadorArquivo(event: any){
    event.preventDefault();

    let element: HTMLElement = document.getElementById('imagem') as HTMLElement;
    element.click();
  }

  erroImagem(event){
    event.target.src = '/assets/images/patient.png';
  }
  
  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpg' });    
    return blob;
 }

  // onFileChange(event) {
  //   if(event.target.files.length > 0) {
  //     this.imagem = <File>event.target.files[0]

  //     let fData: FormData = new FormData();
  //     fData.append('image', this.imagem);

  //     if(this.role === 'Doctor'){
  //       this.doctorService.updateImage(fData)
  //       .subscribe(
  //         () => {
  //           this.toastr.success('Atualizada com sucesso');
  //         },
  //         falha => {
  //           for(const error of falha.error){
  //             this.toastr.error(error);
  //           }
  //         }
  //       );
  //     }
  //     else if(this.role === 'Patient'){
  //       this.patientService.updateImage(fData)
  //         .subscribe(
  //           () => {
  //             this.toastr.success('Atualizada com sucesso');
  //           },
  //           falha => {
  //             for(const error of falha.error){
  //               this.toastr.error(error);
  //             }
  //           }
  //         );
  //     }
      
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       this.imageSrc = reader.result;
  //     }, false);

  //     reader.readAsDataURL(this.imagem);
  //   }
  // }

}
