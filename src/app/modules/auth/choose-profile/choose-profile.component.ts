import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-profile',
  templateUrl: './choose-profile.component.html',
  styleUrls: ['./choose-profile.component.scss']
})
export class ChooseProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
