import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  active = 'profile';
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();
  role: string;
  verticalMenu: Boolean = true;

  constructor() {
    this.onResize();
  }   

  ngOnInit(): void {
    this.role = this.localStorageUtils.getUser()?.claims?.filter(a => a.type === 'role')[0]?.value;

    if(this.role === 'Admin'){
      this.active = 'change-password';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.innerWidth < 830){
      this.verticalMenu = false;
    }
    else {
      this.verticalMenu = true;
    }
  }
}
