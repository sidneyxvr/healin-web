import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Vaccine } from '../../models/vaccine';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class VaccineEditComponent implements OnInit {
  loading: boolean;
  vaccineId: string;

  editForm: FormGroup;
  vaccine: Vaccine;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private vaccineService: VaccineService, 
  ) { }

  ngOnInit(): void {
    this.vaccineId = this.route.snapshot.paramMap.get('id');

    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      isActive: [false]
    })

    this.getById();
  }

  getById(){
    this.vaccineService.getById(this.vaccineId)
      .subscribe(
        data => {
          this.vaccine = data;
          this.fillForm();
        }
      )
  }

  fillForm(){
    this.editForm.patchValue({
      id: this.vaccine.id,
      name: this.vaccine.name,
      isActive: this.vaccine.isActive
    })
  }

  onSubmit(){
    if(this.editForm.invalid){
      return;
    }

    this.loading = true;

    this.vaccine = this.editForm.value;
    this.vaccineService.update(this.vaccine)
      .subscribe(
        () => {
          this.router.navigate(['/admin/vaccine/list'])
            .then(() => this.toastr.success("Atualizado com Sucesso"))
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
