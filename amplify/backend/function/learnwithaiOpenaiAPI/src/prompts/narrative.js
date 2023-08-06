"use strict";
exports.__esModule = true;
exports.generateNarrativePrompt = void 0;
var topics = [
    [
        "Atom", "Molecule", "Element", "Compound", "Reaction", "DNA", "Cell", "Gene", "Protein", "Organism",
        "Evolution", "Genetics", "Chromosome", "Energy", "Photosynthesis", "Respiration", "Ecosystem", "Climate", "Earthquake", "Gravity"
    ],
    [
        "Smartphone", "Laptop", "Tablet", "Smartwatch", "Fitness tracker", "Headphones", "Router", "Bluetooth", "Wi-Fi", "Internet",
        "Social media", "Streaming", "Cloud storage", "Video call", "Virtual assistant", "Smart home", "GPS", "Self-driving car", "Drone", "Robot"
    ],
    [
        "Culture", "Heritage", "Custom", "Ritual", "Ceremony", "Festival", "Celebration", "Tradition", "Costume", "Dance",
        "Music", "Food", "Craft", "Art", "Storytelling", "Legend", "Myth", "Religion", "Cuisine", "Holidays"
    ],
    [
        "Civilization", "Empire", "War", "Revolution", "Monarchy", "Republic", "Dynasty", "Conquest", "Colonization", "Independence",
        "Exploration", "Archaeology", "Artifact", "Document", "Event", "Timeline", "Historian", "Ancient", "Medieval", "Modern"
    ],
    [
        "Exploration", "Journey", "Expedition", "Quest", "Adventure", "Discovery", "Thrill", "Challenge", "Risk", "Adrenaline",
        "Trail", "Treasure", "Map", "Compass", "Campfire", "Backpack", "Wilderness", "Climbing", "Sailing", "Explorers"
    ],
    [
        "Secret", "Clue", "Investigation", "Detective", "Suspense", "Puzzle", "Cryptogram",
        "Unsolved", "Mysterious", "Crime", "Riddle", "Witness", "Evidence", "Revelation"
    ],
    [
        "Classroom", "Teacher", "Student", "Book", "Pencil", "Notebook", "Homework", "Exam", "Education", "Lesson",
        "Subject", "Schoolyard", "Library", "Lunchbox", "Ruler", "Chalkboard", "Backpack", "Friend", "Bell", "Project"
    ],
    [
        "Tree", "Flower", "River", "Mountain", "Ocean", "Sun", "Moon", "Star", "Bird", "Butterfly",
        "Rain", "Cloud", "Forest", "Beach", "Wildlife", "Landscape", "Sunrise", "Sunset", "Breeze", "Waterfall"
    ],
    [
        "Dog", "Cat", "Bird", "Fish", "Lion", "Tiger", "Elephant", "Giraffe", "Monkey", "Kangaroo",
        "Snake", "Turtle", "Dolphin", "Whale", "Butterfly", "Bee", "Spider", "Shark", "Penguin", "Zebra"
    ],
    [
        "Friend", "Companion", "Buddy", "Pal", "Mate", "Confidant", "Ally", "Chum", "Amigo", "Bestie",
        "Camaraderie", "Connection", "Bond", "Trust", "Support", "Laughter", "Memories", "Kindness", "Loyalty", "Embrace"
    ],
    [
        "Parent", "Sibling", "Child", "Mother", "Father", "Son", "Daughter", "Grandparent", "Grandmother", "Grandfather",
        "Aunt", "Uncle", "Cousin", "Nephew", "Niece", "Spouse", "Husband", "Wife", "Relative", "Family"
    ],
    [
        "Chair", "Table", "Sofa", "Bed", "Desk", "Shelf", "Cabinet", "Mirror", "Lamp", "Rug",
        "Guitar", "Piano", "Violin", "Drum", "Trumpet", "Flute", "Saxophone", "Cello", "Clarinet", "Bass guitar"
    ]
];
function generateNarrativePrompt(level) {
    var random = Math.random();
    if (random < 0.2) {
        return "Generate a random sentence about daily life (less than 8 words). And then use the sentence to generate a narrative writing prompt. Only return the prompt.\n\nTemplate: Write a story including the sentence \"[random sentence]\"\n\nExamples:\n- Write a story including the line \"walked to catch the train.\"\n- Write a story including the line \"she opened the door.\"\n- Write a story including the line \"the key is there.\"\n";
    }
    var randomIndex1 = Math.floor(Math.random() * topics.length);
    var randomIndex2 = Math.floor(Math.random() * topics.length);
    var randomSubIndex1 = Math.floor(Math.random() * topics[randomIndex1].length);
    var randomSubIndex2 = Math.floor(Math.random() * topics[randomIndex2].length);
    if (random < 0.4) {
        return "Generate a writing instruction less than 15 words using these two keywords ".concat(topics[randomIndex1][randomSubIndex1], " and ").concat(topics[randomIndex2][randomSubIndex2], ".\n    Template: Write a creative narrative including \"[keyword1]\" and \"[keyword2]\".");
    }
    return "\nGenerate a narrative writing prompt for a ".concat(level, " level student in a topic about ").concat(topics[randomIndex1][randomSubIndex1], " and ").concat(topics[randomIndex2][randomSubIndex2], ".\nThe prompt should be less than 100 words.\nExample 1: Write a story about violin and trust.\nExample 2: Write a experience you have had with your father and laptop.\n");
}
exports.generateNarrativePrompt = generateNarrativePrompt;
