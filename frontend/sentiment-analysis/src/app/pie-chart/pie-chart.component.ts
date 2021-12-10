import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {

  @ViewChild('pieCanvas') public pieCanvas!: ElementRef;

  @Input() data!: any | undefined;
  @Input() hashtag!: string | null;


  pieChart: any;
  legendFontSize: number = 14;
  titleFontSize: number = 16;

  constructor() { }

  ngAfterViewInit(): void {
    this.pieChartBrowser();
  }

  pieChartBrowser(): void {

    if(this.pieChart){
      this.pieChart.destroy();
    }

    let values = this.getNumberOfTweetsInSentimentSegments();

    const chartData = {
      labels: ['Negative', 'Somewhat Negative', 'Neutral', 'Somewhat Positive', 'Positive'],
      datasets: [{
        backgroundColor: [
          '#ff0000',
          '#a12020',
          '#559da4',
          '#f1ff00',
          '#00af03'
        ],
        data: values
      }]
    };

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: chartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: ['Tweets Grouped by Sentiment Score', ' Interpretation for ' + this.hashtag + ' Tweets'],
            font: {
              size: this.titleFontSize
            }
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: this.legendFontSize
              }
            }
          }
        }
      }
    });
  }

  private getNumberOfTweetsInSentimentSegments(): number[]{

      if(this.data){

        let sentimentGroupCounts: number[] = [0, 0, 0, 0, 0];

        for(let i = 0; i < this.data['texts'].length; i++){
          let interpretation = this.data['texts'][i]['interpretation'];
          console.log(interpretation);

          if(interpretation == "Positive"){
            sentimentGroupCounts[4]++;
          }
          else if(interpretation == "Somewhat Positive"){
            sentimentGroupCounts[3]++;
          }
          else if(interpretation == "Neutral"){
            sentimentGroupCounts[2]++;
          }
          else if(interpretation == "Somewhat Negative"){
            sentimentGroupCounts[1]++;
          }
          else if(interpretation == "Negative"){
            sentimentGroupCounts[0]++;
          }
          else {
            console.log("Senti score is out of range in loop")
            return [];
          }
        }
        console.log(sentimentGroupCounts);
        return sentimentGroupCounts;
      }
      else {
        console.log("Data is not defined");
        return [];
      }
  }
}
