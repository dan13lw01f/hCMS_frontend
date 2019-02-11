import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user = '';
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getAdminData()
      .subscribe((resp) => {
        this.user = resp.msg.username;
      });
  }

}
