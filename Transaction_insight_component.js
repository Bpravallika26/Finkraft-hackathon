<!---- HTML CODE ----!>
<canvas id="transactionsChart"></canvas>


<!----- Typescript Transaction insight component ----!>
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transactions-insights',
  templateUrl: './transactions-insights.component.html',
  styleUrls: ['./transactions-insights.component.css']
})
export class TransactionsInsightsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://your-api-url/transaction-insights')
      .subscribe((data: any) => {
        this.renderChart(data);
      });
  }

  renderChart(data: any) {
    const ctx = document.getElementById('transactionsChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Total Amounts',
          data: data.amounts,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}


