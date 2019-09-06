import { Component, OnInit } from '@angular/core';
import { UtilService } from '../common/utils/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {

  public menus: any[] = [];

  constructor(private router: Router,
    private utilService: UtilService) { }

  ngOnInit() {
    this.getMenus();
  }

  public goTo(path): void {
    this.utilService.goTo(this.router, path);
  }

  private getMenus() {
    this.menus = [
      {
        icon: 'help',
        path: 'app/products/',
        label: 'Produtos'
      }
    ];
  }
}
