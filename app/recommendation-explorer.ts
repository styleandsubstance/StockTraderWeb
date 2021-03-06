/**
 * Created by sdoshi on 5/14/2016.
 */
import { ViewChild, Component } from '@angular/core';
import { HTTP_PROVIDERS }    from '@angular/http';
import { RecommendationAnalysis }  from './model/recommendation-analysis';
import { RecommendationAnalysisService } from './service/recommendation-analysis-service';
import {AgGridNg2} from 'ag-grid-ng2/main';
import 'ag-grid-enterprise/main';
import {GridOptions} from 'ag-grid/main';

import {Calendar} from 'primeng/primeng';

@Component({
    selector: 'recommendation-explorer',
    templateUrl: 'app/templates/recommendation-explorer.html',
    directives: [AgGridNg2, Calendar],
    providers:  [
        HTTP_PROVIDERS,
        RecommendationAnalysisService
    ]
})
export class RecommendationExplorer {

    constructor (private recommendationAnalysisService: RecommendationAnalysisService) {}

    errorMessage: string;
    recommendationAnalyses: RecommendationAnalysis[];
    searchDate: string;
    accuracySum: Number;
    filteredRowCount: Number;


    @ViewChild("searchButton") searchButton;
    @ViewChild("agGrid") agGrid;

    getRecommendationAnalyses() {
        console.debug("Here 3");
        if ( !this.searchDate)
            return;

        
        this.recommendationAnalysisService.getRecommendationAnalyses(this.searchDate, this.searchDate)
            .subscribe(
                data => this.recommendationAnalyses = data,
                error =>  this.errorMessage = <any>error
            );
    }

    columnDefs = [

        { headerName: "Ticker", field: "stock.symbol" },
        { headerName: "Company Name", field: "stock.company_name" },
        { headerName: "Analysis Result", field: "result", filter: 'number' },
        { headerName: "Accuracy", field: "accuracy", filter: 'number' }
        // {
        //     headerName: "Price",
        //     field: "price",
        //     cellClass: 'rightJustify',
        //     cellRenderer: function (params: any) {
        //         return '$' + params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //thanks http://stackoverflow.com/users/28324/elias-zamaria
        //     }
        // }

    ]

    GridOptions: GridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.recommendationAnalyses,
        rowGroupPanelShow: 'always',
        floatingBottomRowData: []

    }

    updateSummaryData() {
        var test: Number = 0;

        for ( var i = 0; i < this.agGrid.api.getModel().rowsAfterFilter.length; i++) {
            if ( this.agGrid.api.getModel().rowsAfterFilter[i].data.accuracy != null ) {
                test += this.agGrid.api.getModel().rowsAfterFilter[i].data.accuracy;
            }
        }

        this.accuracySum = new Number(test);
        this.filteredRowCount = new Number(this.agGrid.api.getModel().rowsAfterFilter.length);

    }

    rowSelected() {
        var selectedRows = this.agGrid.api.getSelectedRows();
        var analysisIds = selectedRows.map(function(item) {
            return item.id;
        });

        console.debug(analysisIds);
        
        this.recommendationAnalysisService.getAccuracyAnalyses(analysisIds[0])
            .subscribe(
                data => console.debug(data),
                error =>  this.errorMessage = <any>error
            );


    }


}