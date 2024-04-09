<!---- HTML CODE ----!>
<div *ngIf="showPdf">
  <embed [src]="invoiceUrl" type="application/pdf" width="100%" height="600px" />
</div>


<!---- Typescript invoice viewer component ----!>
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-viewer',
  templateUrl: './invoice-viewer.component.html',
  styleUrls: ['./invoice-viewer.component.css']
})
export class InvoiceViewerComponent {
  @Input() invoiceUrl: string;
  @Input() showPdf: boolean;
}
