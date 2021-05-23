import { FormBaseComponent } from 'src/app/utils/form-base';
import { SelectItem } from './../../../../utils/select-item';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamType } from '../../models/exam-type';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { ExamTypeService } from '../../services/exam-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ExamTypeEditComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  exams: SelectItem[];
  examId: string;

  errors: any[] = [];
  createForm: FormGroup;
  examType: ExamType;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private examService: ExamService, 
    private examTypeService: ExamTypeService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {
    super();

    this.validationMessages = {
      name: {
        required: 'Informe seu nome',
        maxLength: 'O nome de ter no máximo 50 caracteres'
      },
      examId: {
        required: 'Selecione um exame',
      },
    }

    super.configureMessageValidationsBase(this.validationMessages);
   }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');

    this.getExams();
    
    this.createForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      examId: [null, Validators.required],
      isActive: [false]
    });

    this.getById();
  }

  getById(){
    this.examTypeService.getById(this.examId)
      .subscribe(
        data => {
          this.examType = data;
          this.fillForm();
        },
      )
  }

  fillForm(){
    this.createForm.patchValue({
      id: this.examType.id,
      name: this.examType.name,
      examId: this.examType.examId,
      isActive: this.examType.isActive,
    });
  }

  getExams(){
    this.examService.get()
      .subscribe(
        data => {
          this.exams = data;
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
    
    this.examTypeService.update(this.examType)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/admin/exam-type/list'])
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
