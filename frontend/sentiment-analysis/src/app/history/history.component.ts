import {Component, OnInit, ViewChild} from '@angular/core';
import { HistoryService } from '../services/history.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAuth } from "firebase/auth";
import {PieChartComponent} from "../pie-chart/pie-chart.component";
import {ScatterPlotComponent} from "../scatter-plot/scatter-plot.component";

export interface tweet_data{
  tweet: string,
  score: number,
  interpretation: string
}

export interface api_response{
  texts: tweet_data[],
  topic: string
}

export interface response{
  data: api_response[],
  status: string
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @ViewChild('pieChart') pie!: PieChartComponent;
  @ViewChild('scatterPlot') scatter!: ScatterPlotComponent;


  loading: boolean = true;
  index: number = 0;
  started = false;
  myTest: response = {data: [{texts: [], topic: "blank topic"}], status: "undefined status"};
  number_tweets: number = 0;
  selected_api_response?: api_response;
  averageSentiment: number | string = "No Data";
  averageSentimentInterpretation: string = "No Data";
  // otherTest: any = [];
  constructor(private historyService: HistoryService, private http: HttpClient,) { }

  ngOnInit(): void {
  //  get cookie for userId to be passed to getHistory
   let uid: string | null= this.getUid();
   this.historyService.getHistory(uid).subscribe(data => {
        this.myTest = data;
        this.started = true;
        this.loading = false;
    });

  }

  onSelect(this_response: api_response): void {


    this.selected_api_response= this_response;
    this.number_tweets = this_response['texts'].length;
    // console.log("number of tweets is " + this.number_tweets)
    this.averageSentiment = this.getAverageSentimentScoreOfTweets(this_response,this.number_tweets);
    this.averageSentimentInterpretation = this.getAverageSentimentScoreInterpretation(parseFloat(this.averageSentiment));

    if(this.index != 0){
      this.pie.data = this.selected_api_response;
      this.pie.hashtag = this.selected_api_response['topic'];

      this.scatter.data = this.selected_api_response;
      this.scatter.hashtag = this.selected_api_response['topic'];
      this.pie.pieChartBrowser();
      this.scatter.addScatterChart();
    }
    this.index++;
  }

  public getAverageSentimentScoreOfTweets(jsonDataList: any, numberOfTweets: number){

    let total: number = 0;

    for(let i = 0; i < numberOfTweets; i++){
      total+= jsonDataList['texts'][i]['score'];
    }

    let average: number = total / numberOfTweets;

    let roundedAverage: string = average.toFixed(4);

    return roundedAverage;
  }

  public getAverageSentimentScoreInterpretation(averageSentimentScore: number): string {

    if(averageSentimentScore >= 0.6){
      return 'Positive';
    }
    else if(averageSentimentScore > 0.33 && averageSentimentScore < 0.6){
      return 'Somewhat Positive';
    }
    else if(averageSentimentScore < -0.33 && averageSentimentScore > -0.6 ){
      return 'Somewhat Negative';
    }
    else if(averageSentimentScore <= -0.6){
      return 'Negative';
    }
    else if(averageSentimentScore >= -0.33 && averageSentimentScore <= 0.33){
      return 'Neutral';
    }
    else {
      return 'Error';
    }
  }

  public getUid(): string | null{
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return user.uid;
    } else {
      console.log("Not logged in so can't get uid");
      return null;
    }
  }

}
