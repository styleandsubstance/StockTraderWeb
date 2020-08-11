/**
 * Created by sdoshi on 5/4/2016.
 */
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS }    from '@angular/http';



import { RecommendationExplorer } from './recommendation-explorer';
import { EngineAccuracyExplorer } from './engine-accuracy-explorer';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES, RecommendationExplorer, EngineAccuracyExplorer],
    templateUrl: '/app/templates/my-app.html'

})

@Routes([
    {path: '/', component: RecommendationExplorer},
    {path: '/engine-accuracy-explorer', component: EngineAccuracyExplorer}
])

export class AppComponent { }