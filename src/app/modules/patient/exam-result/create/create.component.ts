import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ExamTypeService } from './../../../admin/services/exam-type.service';
import { ExamService } from './../../../admin/services/exam.service';
import { SelectItem } from './../../../../utils/select-item';
import { ExamResult } from './../../models/exam-result';
import { ExamResultService } from '../../services/exam-result.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ExamResultCreateComponent implements OnInit {
  loading: boolean;

  examResult: ExamResult;
  createForm: FormGroup;
  date = new Date();

  exams: SelectItem[];
  examTypes: SelectItem[];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private examService: ExamService,
    private bsLocaleService: BsLocaleService,
    private examTypeService: ExamTypeService,
    private examResultService: ExamResultService, 
    ) {
      this.bsLocaleService.use('pt-br');
  }

  files: File[] = [];
 
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
   
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.examService.get()
      .subscribe(
        data => this.exams = data
      );

    this.createForm = this.fb.group({
      description: ['', [Validators.required]],
      examDate: [null, [Validators.required]],
      examId: [null, [Validators.required]],
      examTypeIds: [[], [Validators.required]]
    })
  }

  getExamTypes(event: any){
    let examId = event.value as string;
    this.examTypeService.getByExamId(examId)
      .subscribe(
        data => { 
          this.examTypes = data;
          this.createForm.get('examTypeIds').setValue([]);
          this.createForm.get('examTypeIds').markAsUntouched();
        }
      );
  }

  onSubmit(){
    this.loading = true;
    const form = new FormData();
    
    for(let i = 0; i < this.files.length; i++){
      form.append(i.toString(), this.files[i]);
    }
    
    this.examResult = this.createForm.value;
    form.append('description', this.examResult.description);
    form.append('examDate', this.examResult.examDate.toLocaleDateString());
    form.append('examId', this.examResult.examId);
    for(let i = 0; i < this.examResult.examTypeIds.length; i++){
      form.append(`examTypeIds[${i}]`, this.examResult.examTypeIds[i]);
    }

    this.examResultService.add(form)
      .subscribe(
        () => {
          this.router.navigate(['/patient/exam-result/list'])
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