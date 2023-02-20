import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.css']
})
export class AppUserListComponent implements OnInit {
  users!: any[];
  data!: string;
  imageUrl!: string;
  
  constructor(private homeAdminUser: HomeComponent) { }

  ngOnInit(): void {
    this.homeAdminUser.getUsersAdmin().subscribe(
      response => {
        console.log(response)
        this.users = response;
      },
      error => {
        console.error(error);
      }
    );
  }
  getImgProfileUser(urlForImgUser:any) {
    this.data = urlForImgUser.split('/')[3];
    this.imageUrl = `${environment.API_URL}/profile-images/${this.data}`
    return this.imageUrl
  }
}
