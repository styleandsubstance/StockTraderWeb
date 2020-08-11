import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { RecommendationAnalysisEngine } from '../model/recommendation-analysis-engine';
import {Observable} from "rxjs/Observable";

@Injectable()
export class RecommendationAnalysisEngineService {
    constructor(private http:Http) { }

    //private url = 'http://localhost:9000/recommendation?startDate=2016-05-12&endDate=2016-05-12';
    private url = 'http://localhost:9000/recommendationAnalysisEngine';



    getRecommendationAnalysisEngines (startDate: string, endDate: string): Observable<RecommendationAnalysisEngine[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('startDate', startDate);
        params.set('endDate', endDate);
        console.debug(startDate);

        return this.http.get(this.url, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();

        //let test = body || {};
        //console.debug(test);

        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}