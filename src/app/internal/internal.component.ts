import { Component, OnInit } from '@angular/core';
import { UtilService } from '../common/utils/util.service';
import { Router } from '@angular/router';
import { Auth } from '../common/models/auth.model';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {

  public menus: any[] = [];
  public auth: Auth;

  constructor(private router: Router,
    private utilService: UtilService) { }

  ngOnInit() {
    this.getMenus();
    this.getAuth();
  }

  public goTo(path): void {
    this.utilService.goTo(this.router, path);
  }

  public logout(): void {
    this.utilService.confirmDialog('Deseja sair?', 'Confirmação', (res: boolean) => {
      if (res) {
        this.utilService.logout();
        this.router.navigate(['auth/login']);
      }
    });
  }

  private getAuth(): void {
    this.auth = this.utilService.getAuth();
  }

  private getMenus() {
    this.menus = [
      {
        icon: 'shopping_cart',
        path: 'app/products/',
        label: 'Produtos'
      }
    ];
  }
}
