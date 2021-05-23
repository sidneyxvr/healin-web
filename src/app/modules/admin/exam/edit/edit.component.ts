import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/utils/form-base';
import { ExamService } from '../../services/exam.service';
import { Exam } from 'src/app/models/exam';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ExamEditComponent implements OnInit {
  loading: boolean = false;
  examId: string;

  errors: any[] = [];
  createForm: FormGroup;
  exam: Exam;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private examService: ExamService, 
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
    this.examService.getById(this.examId)
      .subscribe(
        data => {
          this.exam = data;
          this.fillForm();
        },
      )
  }

  fillForm(){
    this.createForm.patchValue({
      id: this.exam.id,
      name: this.exam.name,
      isActive: this.exam.isActive,
    });
  }

  onSubmit() {
    if(this.createForm.invalid){
      return;
    }
    this.loading = true;

    this.exam = this.createForm.value;
    
    this.examService.update(this.exam)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/admin/exam/list'])
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
