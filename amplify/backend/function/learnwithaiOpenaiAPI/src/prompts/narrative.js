"use strict";
exports.__esModule = true;
exports.generateNarrativePrompt = void 0;
function generateNarrativePrompt(level) {
    var random = Math.random();
    if (random < 0.2) {
        return "Generate two random ordinary items (can be anything including animals and people, in less than 3 words each) and use them to generate a writing instruction less than 12 words. The template for the instruction is as below:\n\nWrite a creative narrative including [Item 1] and [Item 2].";
    }
    else if (random < 0.4) {
        return "Generate a writing instruction less than 15 words. The template for the instruction is as below:\n\nWrite a creative narrative including the sentence \"[random sentence]\".";
    }
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
    var randomIndex1 = Math.floor(Math.random() * topics.length);
    var randomIndex2 = Math.floor(Math.random() * topics.length);
    var randomSubIndex1 = Math.floor(Math.random() * topics[randomIndex1].length);
    var randomSubIndex2 = Math.floor(Math.random() * topics[randomIndex2].length);
    return "\nGenerate a narrative writing prompt for a ".concat(level, " level student in a topic about ").concat(topics[randomIndex1][randomSubIndex1], " and ").concat(topics[randomIndex2][randomSubIndex2], ".\nThe prompt should be less than 100 words.\nExample 1: Write a story about violin and trust.\nExample 2: Write a experience you have had with your father and laptop.\n");
}
exports.generateNarrativePrompt = generateNarrativePrompt;
