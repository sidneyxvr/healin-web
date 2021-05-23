import { Exam } from './../../../../models/exam';
import { FormBaseComponent } from 'src/app/utils/form-base';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ExamCreateComponent implements OnInit {
  loading: boolean = false;
  errors: any[] = [];
  createForm: FormGroup;
  exam: Exam;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private examService: ExamService, 
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

    this.exam = this.createForm.value;
    
    this.examService.add(this.exam)
      .subscribe(
        () => {
          this.router.navigate(['/admin/exam/list'])
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
