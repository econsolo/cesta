import { Component, OnInit } from '@angular/core';
import { LoadingStatus as LoadingStatus } from './common/utils/loading.status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showLoading: boolean;

  constructor(private loadingStatus: LoadingStatus) { }

  ngOnInit(): void {

    this.loadingStatus.get().subscribe((status: boolean) => {
      setTimeout(() => {
        this.showLoading = status;
      }, 0);
    });

  }
}
