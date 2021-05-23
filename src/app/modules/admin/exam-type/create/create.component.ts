import { ExamTypeService } from './../../services/exam-type.service';
import { SelectItem } from './../../../../utils/select-item';
import { ExamService } from './../../services/exam.service';
import { FormBaseComponent } from 'src/app/utils/form-base';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamType } from '../../models/exam-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ExamTypeCreateComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  exams: SelectItem[];

  errors: any[] = [];
  createForm: FormGroup;
  examType: ExamType;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private examService: ExamService, 
    private examTypeService: ExamTypeService,
    private toastr: ToastrService
    ) {
    super();

    this.validationMessages = {
      name: {
        required: 'Informe o nome',
        maxLength: 'O nome de ter no máximo 50 caracteres'
      },
      examId: {
        required: 'Selecione um exame',
      },
    }

    super.configureMessageValidationsBase(this.validationMessages);
   }

  ngOnInit(): void {
    this.getExams();
    
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      examId: [null, Validators.required]
    });
  }

  getExams(){
    this.examService.get()
      .subscribe(
        data => {
          this.exams = data;
          console.log(this.exams)
        }
      )
  }

  ngAfterViewInit(): void {
    super.configureValidationFormBase(this.formInputElements, this.createForm);
  }
  
  onSubmit() {
    if(this.createForm.invalid){
      return;
    }
    this.loading = true;

    this.examType = this.createForm.value;
    
    this.examTypeService.add(this.examType)
      .subscribe(
        () => {
          this.router.navigate(['/admin/exam-type/list'])
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
