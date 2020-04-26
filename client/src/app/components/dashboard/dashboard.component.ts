import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  user: Object; //Send it to Edit Profile Component

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile:any) => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }
}
