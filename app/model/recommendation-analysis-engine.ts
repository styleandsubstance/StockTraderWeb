

export class RecommendationAnalysisEngine {
    constructor(
        public id: number,
        public engine_id: number,
        public engine_name: String,
        public analysis_id: number,
        public weight: number,
        public result: number,
        public analysis_result: number,
        public accuracy: number,
        public symbol: String

    ) { }
}
