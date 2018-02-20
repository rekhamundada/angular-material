import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  users: Observable<User[]>;
  isDarkTheme: boolean;
  dir: string = 'ltr';

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(zone: NgZone,
              private router: Router,
              private userService: UserService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(
      data => {
        if (data.length > 0) {
          this.router.navigate(['/contactmanager', data[0].id]);
        }
      });

      this.router.events.subscribe(() => {
        // tslint:disable-next-line:curly
        if (this.isScreenSmall())
          this.sidenav.close();
      });
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle()
      .then(() => this.sidenav.toggle());
  }
}
