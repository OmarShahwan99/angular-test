import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service.component';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['user-list.component.css'],
  animations: [
    trigger('scaleInOut', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(500, style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [animate(500, style({ transform: 'scale(0)' }))]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  activePage: number = 1;
  constructor(private http: HttpService, private router: Router) {}
  fetchUsers() {
    this.loading = true;
    this.http.getData(this.activePage).subscribe((users: any) => {
      this.users = users.data;
      this.loading = false;
    });
  }
  ngOnInit(): void {
    this.fetchUsers();
  }
  getPage(pageIdx: number) {
    this.activePage = pageIdx;
    this.fetchUsers();
  }
  onCardClick(id: number) {
    this.router.navigate(['/user', id]);
  }
  goToUser(id: any) {
    if (Number(id) >= 13) {
      return;
    }
    this.router.navigate(['/user', id]);
  }
}
