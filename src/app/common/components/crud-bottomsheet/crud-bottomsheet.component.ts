import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-crud-bottomsheet',
  templateUrl: './crud-bottomsheet.component.html',
  styleUrls: ['./crud-bottomsheet.component.css']
})
export class CrudBottomsheetComponent implements OnInit {

  private id: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<CrudBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.id = data.id;
  }

  ngOnInit() {
  }

  public close(decision: string): void {
    this.bottomSheetRef.dismiss(decision);
  }

}
