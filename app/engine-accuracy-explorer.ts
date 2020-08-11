/**
 * Created by sdoshi on 5/30/2016.
 */
import { ViewChild, Component } from '@angular/core';
import {AgGridNg2} from 'ag-grid-ng2/main';
import 'ag-grid-enterprise/main';
import {GridOptions} from 'ag-grid/main';
import {Calendar} from 'primeng/primeng';
import { HTTP_PROVIDERS }    from '@angular/http';

import {RecommendationAnalysisEngineService} from "./service/recommendation-analysis-engine-service";
import {RecommendationAnalysisEngine} from "./model/recommendation-analysis-engine";

/**
 * Component to analyze engine accuracy
 */ 
@Component({
    selector: 'engine-accuracy-explorer',
    templateUrl: 'app/templates/engine-accuracy-explorer.html',
    directives: [AgGridNg2, Calendar],
    providers:  [
        HTTP_PROVIDERS,
        RecommendationAnalysisEngineService
    ]
})

export class EngineAccuracyExplorer {


    constructor (private recommendationAnalysisEngineService: RecommendationAnalysisEngineService) {}

    searchStartDate: string;
    searchEndDate: string;

    recommendationAnalysisEngines: RecommendationAnalysisEngine[];

    errorMessage: string;
    
    @ViewChild("searchButton") searchButton;
    @ViewChild("agGrid") agGrid;

    columnDefs = [

        { headerName: "Engine", field: "engine_name", rowGroupIndex: 0 },
        { headerName: "Analysis Result", field: "analysis_result", filter: 'number', aggFunc: 'sum' },
        { headerName: "Engine Result", field: "result", filter: 'number', aggFunc: 'sum' },
        { headerName: "Accuracy", field: "accuracy", filter: 'number', aggFunc: 'sum' },
        { headerName: "Symbol", field: "symbol" },
    ]

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.recommendationAnalysisEngines,
        rowGroupPanelShow: 'always',
        floatingBottomRowData: [],
        groupUseEntireRow: true

    }
    

    getRecommendationEngineAnalyses() {
        console.debug("Here");
        if ( !this.searchStartDate)
            return;

        if ( !this.searchEndDate)
            return;


        this.recommendationAnalysisEngineService.getRecommendationAnalysisEngines(this.searchStartDate, this.searchEndDate)
            .subscribe(
                data => this.recommendationAnalysisEngines = data,
                error =>  this.errorMessage = <any>error
            );
    }

}
