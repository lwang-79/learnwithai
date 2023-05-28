"use strict";
exports.__esModule = true;
exports.EssayType = exports.EssayTopic = exports.QuestionLevel = exports.QuestionCategory = exports.MathConcept = exports.QuestionType = exports.APIOperation = void 0;
var APIOperation;
(function (APIOperation) {
    APIOperation["WritingPrompt"] = "writing-prompt";
    APIOperation["WritingMark"] = "writing-mark";
    APIOperation["WritingPolish"] = "writing-polish";
    APIOperation["MathAnswer"] = "math-answer";
    APIOperation["MathQuestion"] = "math-question";
    APIOperation["MathDataset"] = "math-dataset";
    APIOperation["AskAnything"] = "ask-anything";
})(APIOperation = exports.APIOperation || (exports.APIOperation = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["MultiChoice"] = "multi-choice";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var MathConcept;
(function (MathConcept) {
    // Addition = 'addition',
    // Subtraction = 'subtraction',
    // Multiplication = 'multiplication',
    // Division = 'division',
    MathConcept["Arithmetic"] = "arithmetic";
    MathConcept["Decimals"] = "decimals";
    MathConcept["Percentage"] = "percentage";
    MathConcept["Ratio"] = "ratio";
    MathConcept["Fractions"] = "fractions";
    MathConcept["TimeJourney"] = "time or journey";
    // Probability = 'probability',
    // Statistics = 'statistics',
    // Algebra = 'algebra',
    // Measurement = 'measurement',
    // Time = 'time',
    // Shopping = 'shopping',
    // Production = 'production',
    // Profit = 'profit',
    // // ProblemSolving = 'problem solving',
    // TwoPartJourney = 'two-part journey',
    // Banking = 'banking',
    // Polynomials = 'polynomials',
    // // Geometry = 'geometry',
    // Trigonometry = 'trigonometry',
    // Functions = 'functions',
    // ComplexNumbers = 'complex numbers',
    // Sequences = 'sequences',
    // Series = 'series',
    // Vectors = 'vectors',
    // Matrices = 'matrices',
    // // DifferentialEquations = 'differential equations',
    // // Calculus = 'calculus',
    // Geometry = 'geometry',
    // Equations = 'equations',
    // CoordinateGeometry = 'coordinate geometry',
    // Indices = 'indices',
    // MeasurementPerimeter = 'measurement perimeter',
    // MeasurementArea = 'measurement area',
})(MathConcept = exports.MathConcept || (exports.MathConcept = {}));
var QuestionCategory;
(function (QuestionCategory) {
    QuestionCategory["Math"] = "mathematics";
    QuestionCategory["AdvancedMath"] = "advanced mathematics";
})(QuestionCategory = exports.QuestionCategory || (exports.QuestionCategory = {}));
var QuestionLevel;
(function (QuestionLevel) {
    QuestionLevel["Year1"] = "Year-1";
    QuestionLevel["Year2"] = "Year-2";
    QuestionLevel["Year3"] = "Year-3";
    QuestionLevel["Year4"] = "Year-4";
    QuestionLevel["Year5"] = "Year-5";
    QuestionLevel["Year6"] = "Year-6";
    QuestionLevel["Year7"] = "Year-7";
    QuestionLevel["Year8"] = "Year-8";
    QuestionLevel["Year9"] = "Year-9";
    QuestionLevel["Year10"] = "Year-10";
    QuestionLevel["Year11"] = "Year-11";
    QuestionLevel["Year12"] = "Year-12";
    QuestionLevel["GSM8K"] = "GSM8K";
    QuestionLevel["MathQA"] = "MathQA";
    // AQuA = 'AQuA',
    QuestionLevel["Level1"] = "Level 1";
    QuestionLevel["Level2"] = "Level 2";
    QuestionLevel["Level3"] = "Level 3";
    QuestionLevel["Level4"] = "Level 4";
    QuestionLevel["Level5"] = "Level 5";
    // Primary = 'primary school',
    // Middle = 'middle school',
    // High = 'high school'
})(QuestionLevel = exports.QuestionLevel || (exports.QuestionLevel = {}));
var EssayTopic;
(function (EssayTopic) {
    EssayTopic["Society"] = "society";
    EssayTopic["Culture"] = "culture";
    EssayTopic["Science"] = "science";
    EssayTopic["Technology"] = "technology";
    EssayTopic["History"] = "history";
    EssayTopic["Politics"] = "politics";
    // Creative = 'creative'
    // Narrative = 'narrative',
    // Reading = 'reading'
})(EssayTopic = exports.EssayTopic || (exports.EssayTopic = {}));
var EssayType;
(function (EssayType) {
    EssayType["Persuasive"] = "persuasive";
    // Expository = 'expository',
    // Descriptive = 'descriptive',
    EssayType["Narrative"] = "narrative";
})(EssayType = exports.EssayType || (exports.EssayType = {}));
