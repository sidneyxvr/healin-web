import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageUtils } from './../../utils/localstorage';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  displayName: string;
  role: string;
  public isCollapsed: boolean;

  constructor(private router: Router) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    let user = this.localStorageUtils.getUser();
    if(!user){
      return this.router.navigate(['/auth/login'])
    }

    this.role = user?.claims?.filter(a => a.type === 'role')[0]?.value;
    this.displayName = user.email;
  }

  onSignOut() {
    this.localStorageUtils.limparDadosLocaisUsuario();

    this.router.navigate(['auth/login']);
  }
}
