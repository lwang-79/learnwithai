"use strict";
exports.__esModule = true;
exports.generateNarrativePrompt = void 0;
function generateNarrativePrompt(level) {
    var topics = [
        'science',
        'tradition',
        'daily life',
        'history',
        'memoir',
        'adventure',
        'mystery',
        'school',
        'nature',
        'animal',
        'friendship',
        'family',
        'technology',
        'subject'
    ];
    var randomIndex = Math.floor(Math.random() * topics.length);
    return "\nGive a narrative writing prompt for a ".concat(level, " level student in a topic of ").concat(topics[randomIndex], "\n");
}
exports.generateNarrativePrompt = generateNarrativePrompt;
