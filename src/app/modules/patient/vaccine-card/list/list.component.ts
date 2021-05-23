import { ConfirmationDialogService } from './../../../../components/services/confirmation-dialog.service';
import { Component, OnInit } from '@angular/core';

import { VaccineDoseService } from './../../services/vaccine-dose.service';
import { VaccineDose } from './../../models/vaccine-dose';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class VaccineCardListComponent implements OnInit {

  doses: [string, VaccineDose[]];

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private vaccineDoseService: VaccineDoseService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.vaccineDoseService.get()
      .subscribe(
        data => {
          this.doses = data;
        }
      )
  }

  abrirDialogoConfirmacao(id: string) {
    this.confirmationDialogService.confirm('Remover', `Quer mesmo remover esta dose?`)
    .then((confirmado) => {
      if(confirmado){
        this.delete(id);
      }
    }).catch(() => {})
  }

  delete(id: string){
    this.vaccineDoseService.delete(id)
      .subscribe(
        () => {
          this.toastr.success('Removido com sucesso');
          this.get();
        },
        fail => {

        }
      )
  }
}
