import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDialogService } from './../../../../components/services/confirmation-dialog.service';
import { environment } from './../../../../../environments/environment';
import { ExamResult } from './../../models/exam-result';
import { ExamResultService } from './../../services/exam-result.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExamResultListComponent implements OnInit {
  examResults: ExamResult[];
  amount: number = 0;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  orderOptions: any[];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private examResultService: ExamResultService,
    private toastr: ToastrService,
    ) {
      this.orderOptions = [
        {id: 'description', name: 'Descrição'}, 
        {id: 'exam', name: 'Exame'},
        {id: 'examDate', name: 'Data do Exame'},
      ]
    }

  ngOnInit(): void {
    this.getPaged();  
  }

  getPaged(){
    this.examResultService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.examResults = data.collection,
          this.examResults.map(a => a.filePath = environment.sourceFileUrlV1 + a.filePath)
          this.amount = data.amount
        }
      )
  }

  abrirDialogoConfirmacao(id: string) {
    this.confirmationDialogService.confirm('Remover', `Quer mesmo remover este resultado de exame?`)
    .then((confirmado) => {
      if(confirmado){
        this.delete(id);
      }
    }).catch(() => {})
  }

  delete(id: string){
    this.examResultService.delete(id)
      .subscribe(
        () => {
          this.toastr.success('Removido com sucesso');
          this.getPaged();
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
        }
      )
  }

}
