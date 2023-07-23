"use strict";
exports.__esModule = true;
exports.APIError = exports.APIName = exports.EssayType = exports.EssayTopic = exports.QuestionLevel = exports.QuestionCategory = exports.StemConcept = exports.MathConcept = exports.HendrycksConcept = exports.QuestionType = exports.QuestionRunMode = exports.QuestionSource = exports.APIOperation = void 0;
var APIOperation;
(function (APIOperation) {
    APIOperation["WritingPrompt"] = "writing-prompt";
    APIOperation["WritingMark"] = "writing-mark";
    APIOperation["WritingPolish"] = "writing-polish";
    APIOperation["MathAnswer"] = "math-answer";
    APIOperation["MathQuestion"] = "math-question";
    APIOperation["MathDataset"] = "math-dataset";
    APIOperation["AskAnything"] = "ask-anything";
    APIOperation["StemQuestion"] = "stem-question";
    APIOperation["Chat"] = "chat";
})(APIOperation = exports.APIOperation || (exports.APIOperation = {}));
var QuestionSource;
(function (QuestionSource) {
    QuestionSource["ChatGPT3"] = "ChatGPT-3";
    QuestionSource["ChatGPT4"] = "ChatGPT-4";
    QuestionSource["Hendrycks"] = "Hendrycks MATH";
    QuestionSource["GSM8K"] = "GMS8K";
    QuestionSource["MathQA"] = "MathQA";
    QuestionSource["Competition"] = "Competition";
    QuestionSource["SavedQuestions"] = "Saved Questions";
})(QuestionSource = exports.QuestionSource || (exports.QuestionSource = {}));
var QuestionRunMode;
(function (QuestionRunMode) {
    QuestionRunMode["Practice"] = "practice";
    QuestionRunMode["Test"] = "test";
    QuestionRunMode["Review"] = "review";
})(QuestionRunMode = exports.QuestionRunMode || (exports.QuestionRunMode = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["MultiChoice"] = "multi-choice";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var HendrycksConcept;
(function (HendrycksConcept) {
    HendrycksConcept["Prealgebra"] = "Prealgebra";
    HendrycksConcept["IntermediateAlgebra"] = "Intermediate Algebra";
    HendrycksConcept["Algebra"] = "Algebra";
    HendrycksConcept["CountingProbability"] = "Counting & Probability";
    HendrycksConcept["Geometry"] = "Geometry";
    HendrycksConcept["NumberTheory"] = "Number Theory";
    HendrycksConcept["Precalculus"] = "Precalculus";
})(HendrycksConcept = exports.HendrycksConcept || (exports.HendrycksConcept = {}));
var MathConcept;
(function (MathConcept) {
    MathConcept["Arithmetic"] = "arithmetic";
    MathConcept["Decimals"] = "decimals";
    MathConcept["Percentage"] = "percentage";
    MathConcept["Ratio"] = "ratio";
    MathConcept["Fractions"] = "fractions";
    MathConcept["TimeJourney"] = "time or journey";
    MathConcept["Probability"] = "probability";
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
var StemConcept;
(function (StemConcept) {
    StemConcept["Science"] = "science";
    StemConcept["Astronomy"] = "astronomy";
    StemConcept["Biology"] = "biology";
    StemConcept["Chemistry"] = "chemistry";
    StemConcept["ComputerScience"] = "computer science";
    StemConcept["Electrical"] = "electrical";
    StemConcept["Mathematics"] = "mathematics";
    StemConcept["Medicine"] = "medicine";
    StemConcept["Physics"] = "physics";
    StemConcept["ConceptualPhysics"] = "conceptual physics";
    StemConcept["Statistics"] = "statistics";
})(StemConcept = exports.StemConcept || (exports.StemConcept = {}));
var QuestionCategory;
(function (QuestionCategory) {
    QuestionCategory["Math"] = "mathematics";
    QuestionCategory["AdvancedMath"] = "advanced mathematics";
    QuestionCategory["Stem"] = "stem";
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
})(EssayTopic = exports.EssayTopic || (exports.EssayTopic = {}));
var EssayType;
(function (EssayType) {
    EssayType["Persuasive"] = "persuasive";
    // Expository = 'expository',
    // Descriptive = 'descriptive',
    EssayType["Narrative"] = "narrative";
    EssayType["Custom"] = "custom";
})(EssayType = exports.EssayType || (exports.EssayType = {}));
var APIName;
(function (APIName) {
    APIName["OpenAI"] = "openai";
})(APIName = exports.APIName || (exports.APIName = {}));
var APIError;
(function (APIError) {
    APIError["Timeout"] = "request is timed out";
    APIError["TooBusy"] = "the server is too busy";
})(APIError = exports.APIError || (exports.APIError = {}));
