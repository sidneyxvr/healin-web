import { FormBaseComponent } from 'src/app/utils/form-base';
import { Specialty } from './../../models/specialty';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialtyService } from '../../services/specialty.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class SpecialtyEditComponent implements OnInit {
  loading: boolean = false;
  examId: string;

  errors: any[] = [];
  createForm: FormGroup;
  specialty: Specialty;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private specialtyService: SpecialtyService, 
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {
   }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');

    this.createForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      isActive: [false]
    });

    this.getById();
  }

  getById(){
    this.specialtyService.getById(this.examId)
      .subscribe(
        data => {
          this.specialty = data;
          this.fillForm();
        },
      )
  }

  fillForm(){
    this.createForm.patchValue({
      id: this.specialty.id,
      name: this.specialty.name,
      isActive: this.specialty.isActive,
    });
  }
  
  onSubmit() {
    if(this.createForm.invalid){
      return;
    }
    this.loading = true;

    this.specialty = this.createForm.value;
    
    this.specialtyService.update(this.specialty)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/admin/specialty/list'])
            .then(() => this.toastr.success("Atualizado com Sucesso"))
        },
        fail => {
          this.loading = false;
          for(const error of fail.error){
            this.toastr.error(error);
          }
        }
      )
  }
}
