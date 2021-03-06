import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    this.registerMode = true;
  }
  onSuccessfullRegister(event: boolean) {
    this.registerMode = event;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
