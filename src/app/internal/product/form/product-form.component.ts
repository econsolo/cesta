import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/common/utils/util.service';
import { ProductService } from 'src/app/common/services/product.service';
import { CategoryService } from 'src/app/common/services/category.service';
import { Product } from 'src/app/common/models/product.model';
import { RestResponse } from 'src/app/common/models/rest-response.model';
import { debounceTime } from 'rxjs/operators';
import { Category } from 'src/app/common/models/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public form: FormGroup;
  public categories: Category[] = new Array<Category>();

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private productService: ProductService,
    private categoryService: CategoryService) {

    this.form = this.createForm();
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.find(id);
    }
    this.configureTotalValue();
    this.getCategories();
  }

  public save(product: Product): void {

    if (this.form.invalid) {
      this.util.showErrors(this.form);
      return;
    }

    if (!product.id) {

      this.productService.post(product).subscribe((res: RestResponse) => {
        this.showMessageAndBack(res.message);
      });

    } else {

      this.productService.put(product).subscribe((res: RestResponse) => {
        this.showMessageAndBack(res.message);
      });

    }
  }

  public back(): void {
    this.util.backToCaller(this.router, ['app/products/']);
  }

  public getTotalValue(value: number, count: number): number {
    if (value > 0 && count > 0) {
      return count * value;
    }
    return 0;
  }

  private find(id: string): void {
    this.productService.find(id).subscribe((res: RestResponse) => {
      this.form.patchValue(res.data);
    });
  }

  private getCategories(): void {
    this.categoryService.get().subscribe((res: RestResponse) => {
      this.categories = res.data;
    });
  }

  private showMessageAndBack(message: string): void {
    this.util.snackMsg(message);
    this.util.backToCaller(this.router, ['app/products/']);
  }

  private configureTotalValue(): void {
    const formControls = this.form.controls;
    formControls.totalValue.disable();
    
    formControls.value.valueChanges.pipe(debounceTime(200)).subscribe((value: number) => {
      formControls.totalValue.setValue(formControls.count.value * value);
    });

    formControls.count.valueChanges.pipe(debounceTime(200)).subscribe((count: number) => {
      formControls.totalValue.setValue(formControls.value.value * count);
    });
  }

  private createForm(): FormGroup {
    return this.builder.group({
      id: ['', []],
      productcode: ['', [
        Validators.required,
        UtilService.validateProductCode
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      description: ['', [
        Validators.maxLength(100)
      ]],
      count: [0, [
        Validators.required,
        Validators.minLength(2)
      ]],
      value: [0, [
        Validators.required,
        Validators.minLength(2)
      ]],
      totalValue: [0, []],
      category: this.createCategoryForm()
    });
  }

  private createCategoryForm(): FormGroup {
    return this.builder.group({
      id: ['', [
        Validators.required
      ]]
    });
  }
}
