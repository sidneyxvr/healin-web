import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { ConfirmationDialogService } from './../../../../components/services/confirmation-dialog.service';
import { PrescriptionService } from './../../services/prescription.service';
import { Prescription } from './../../models/prescription';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: Prescription[];
  amount: number = 0;

  pageSize: number = 10;
  page: number = 1;
  search: string = '';
  filter: string = '';
  order: string;

  orderOptions: any[];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private prescriptionService: PrescriptionService,
    private toastr: ToastrService,
  ) { 
    this.orderOptions = [
      {id: 'description', name: 'Descrição'}, 
      {id: 'especialidade', name: 'Especialidade'},
      {id: 'prescriptionDate', name: 'Data da Consulta'},
    ]
  }

  ngOnInit(): void {
    this.getPaged();
  }

  getPaged(){
    this.prescriptionService.getPaged(this.page, this.pageSize, this.search, this.filter, this.order || '')
      .subscribe(
        data => {
          this.prescriptions = data.collection;
          this.prescriptions.map(a => a.filePath = environment.sourceFileUrlV1 + a.filePath)
          this.amount = data.amount;
        }
      )
  }

  abrirDialogoConfirmacao(id: string) {
    this.confirmationDialogService.confirm('Remover', `Quer mesmo remover esta prescrição médica?`)
    .then((confirmado) => {
      if(confirmado){
        this.delete(id);
      }
    }).catch(() => {})
  }

  delete(id: string){
    this.prescriptionService.delete(id)
      .subscribe(
        () => {
          this.toastr.success('Removido com sucesso');
          this.getPaged();
        },
        fail => {
          
        }
      )
  }

}
