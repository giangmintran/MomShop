import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'table-custom',
  templateUrl: './p-table-custom.component.html',
  styleUrls: ['./p-table-custom.component.scss']
})
export class PTableCustomComponent implements OnInit {
  @Input() colDef;
  @Input() rowData;
  @Input() pageSize : number = 15;
  @Input() rowSelectionable: boolean = false;
  cols;
  tableData;

  @Output() onSelection = new EventEmitter();
  selectedRow;
  constructor(private http: HttpClient) {
    this.cols = [
      {
        field: 'id',
        header: '#Id',
      },
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'category',
        header: 'Category',
      },
      {
        field: 'quantity',
        header: 'Quantity',
      },
    ];
    this.getProductData();
  }
  getProductData(): void {
    const url = 'http://localhost:5001/api/product/find-all';
    this.http.get(url).subscribe(
      (data) => {
        this.tableData = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {}
  onSelectionChange(event){
      this.onSelection.emit(event);
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order * result;
    });
}
}
