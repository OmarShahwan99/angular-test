import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http-service.component';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [
    trigger('movingLeftToRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(500, style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(500, style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  loading: boolean = false;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe((user: any) => {
      this.user = user.data;
      this.loading = false;
    });
  }
  onBackToUsers() {
    this.router.navigate(['/users']);
  }
}
