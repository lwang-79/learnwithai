"use strict";
exports.__esModule = true;
exports.generateNarrativePrompt = void 0;
function generateNarrativePrompt(level) {
    var random = Math.random();
    if (random < 0.2) {
        return "Generate two random ordinary items (can be anything including animals and people, in less than 3 words each) and use them to generate a writing instruction less than 12 words. The template for the instruction is as below:\n\n    Write a creative narrative including [Item 1] and [Item 2].";
    }
    else if (random < 0.3) {
        return "Generate a random short sentence less than 10 words and use it to generate a writing instruction less than 17 words. The template for the instruction is as below:\n\n    Write a creative narrative including the sentence \"[random sentence]\".";
    }
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
