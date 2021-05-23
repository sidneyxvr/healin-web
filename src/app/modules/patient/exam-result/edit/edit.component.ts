import { environment } from './../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale); 

import { SelectItem } from './../../../../utils/select-item';
import { ExamService } from './../../../admin/services/exam.service';
import { ExamTypeService } from './../../../admin/services/exam-type.service';
import { ExamResult } from './../../models/exam-result';
import { ExamResultService } from './../../services/exam-result.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ExamResultEditComponent implements OnInit {
  loading: boolean;
  
  examResult: ExamResult;
  examResultId: string;
  date = new Date();

  editForm: FormGroup;

  exams: SelectItem[];
  examTypes: SelectItem[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private examService: ExamService,
    private bsLocaleService: BsLocaleService,
    private examTypeService: ExamTypeService,
    private examResultService: ExamResultService, 
    ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit(): void {
    this.examService.get()
      .subscribe(
        data => this.exams = data
      );

    this.examResultId = this.route.snapshot.paramMap.get('id');

    this.editForm = this.fb.group({
      id: [''],
      description: ['', [Validators.required]],
      examDate: ['', [Validators.required]],
      examId: ['', [Validators.required]],
      examTypeIds: [[], [Validators.required, Validators.min(1)]]
    });

    this.getById();
  }

  getExamTypes(event: any){
    let examId = event.value as string;
    this.examTypeService.getByExamId(examId)
      .subscribe(
        data => { 
          this.examTypes = data;
          this.editForm.get('examTypeIds').setValue([]);
          this.editForm.get('examTypeIds').markAsUntouched();
        }
      );
  }

  getById(){
    this.examResultService.getById(this.examResultId)
      .subscribe(
        data => { 
          this.examResult = data;
          this.examResult.filePath = environment.sourceFileUrlV1 + this.examResult.filePath;
          this.examTypeService.getByExamId(this.examResult.examId)
            .subscribe(
              data => this.examTypes = data
            );
          this.fillForm();
        }
      )
  }

  fillForm(){
    this.editForm.patchValue({
      id: this.examResult.id,
      description: this.examResult.description,
      examDate: new Date(this.examResult.examDate),
      examId: this.examResult.examId,
      examTypeIds: this.examResult.examTypes?.map(a => a.value)
    })
  }
  
  onSubmit(){
    this.loading = true;

    this.examResult = this.editForm.value;
    this.examResultService.update(this.examResult)
      .subscribe(
        () => {
          this.router.navigate(['/patient/exam-result/list'])
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
