import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  public getHistory(){

      return this.http.get(
        'https://jamalsaied.net:8888/all_queries'
      );
  }

  public getSentimentAnalysis(uid: string, hashtag: string, limit: number){

    const url = 'https://jamalsaied.net:8888/twitter_api';
    return this.http.post(url, {uid: uid, topic: hashtag, limit: limit});
  }
}
