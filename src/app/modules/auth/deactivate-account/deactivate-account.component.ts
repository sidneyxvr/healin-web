import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { User } from '../models/user';

@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.scss']
})
export class DeactivateAccountComponent implements OnInit {
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  loading: boolean = false;
  
  user: User;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  onSubmit(){
    this.authService.deactivateAccount()
      .subscribe(
        () => {
            this.localStorageUtils.limparDadosLocaisUsuario();
            this.router.navigate(['auth/login'])
              .then(() => this.toastr.success('Conta desativada com sucesso'));
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        }
      )
  }

  getInfo(){
    this.authService.getUserInfo()
      .subscribe(
        data => {
          this.user = data;
        }
      )
  }
}
