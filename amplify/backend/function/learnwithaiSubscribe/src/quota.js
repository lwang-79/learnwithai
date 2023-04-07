"use strict";
exports.__esModule = true;
exports.Quota = void 0;
exports.Quota = {
    free: {
        mathPerDay: 100,
        readingPerDay: 3,
        writingPerDay: 1,
        savedQuestions: 0,
        savedTests: 0,
        savedEssays: 0
    },
    personal: {
        mathPerDay: 100,
        readingPerDay: 5,
        writingPerDay: 2,
        savedQuestions: 100,
        savedTests: 50,
        savedEssays: 50
    },
    professional: {
        mathPerDay: 200,
        readingPerDay: 10,
        writingPerDay: 5,
        savedQuestions: 200,
        savedTests: 100,
        savedEssays: 100
    },
    enterprise: {
        mathPerDay: 500,
        readingPerDay: 150,
        writingPerDay: 10,
        savedQuestions: 1000,
        savedTests: 500,
        savedEssays: 500
    }
};
