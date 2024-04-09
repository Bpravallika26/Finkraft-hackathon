<!---- HTML CODE ---!>
<ag-grid-angular
    style="width: 100%; height: 500px;"
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    (gridReady)="onGridReady($event)">
</ag-grid-angular>

<!--- Typescript Transaction table component --->
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  private gridApi;

  columnDefs = [
    { field: 'transactionId' },
    { field: 'customerId' },
    { field: 'amount' },
    { field: 'transactionDate' }
  ];
  rowData: [];

  constructor(private http: HttpClient) { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.http.get('http://your-api-url/transactions')
      .subscribe(data => {
        this.rowData = data;
      });
  }
}
