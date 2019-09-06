import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/common/services/product.service';
import { UtilService } from 'src/app/common/utils/util.service';
import { Product } from 'src/app/common/models/product.model';
import { RestResponse } from 'src/app/common/models/rest-response.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CrudBottomsheetComponent } from 'src/app/common/components/crud-bottomsheet/crud-bottomsheet.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public dataSource: MatTableDataSource<Product>;

  constructor(private router: Router,
    private productService: ProductService,
    private util: UtilService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.get();
  }

  public goToForm(id: string): void {
    this.util.goTo(this.router, 'app/products/add', id);
  }

  public remove(id: string): void {
    this.util.confirmDialog('Certeza?', 'Confirmar exclusão', (choose: boolean) => {
      if (choose) {
        this.productService.delete(id).subscribe((res: RestResponse) => {
          this.util.snackMsg(res.message);
          this.get();
        });
      }
    });
  }

  public openBottomSheet(id: string): void {
    const bottomSheet = this.bottomSheet.open(CrudBottomsheetComponent, {
      data: { id }
    });

    bottomSheet.afterDismissed().subscribe(choose => {
      switch (choose) {
        case 'update':
          this.goToForm(id);
          break;
        case 'delete':
          this.remove(id);
          break;
      }
    });
  }

  private get(): void {
    this.productService.get().subscribe((res: RestResponse) => {
      this.dataSource = new MatTableDataSource<Product>(res.data);
    });
  }

}
