import {Stock} from "./stock";
/**
 * Created by sdoshi on 5/14/2016.
 */
export class RecommendationAnalysis {
    constructor(
        public id: number,
        public name: String,
        public result: number,
        public accuracy: number,
        public stock: Stock

    ) { }
}
