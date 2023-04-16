import { QuestionLevel } from '@/types/types';


export function generateNarrativePrompt(level: QuestionLevel) {
  const topics = [
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
  ]

  const randomIndex = Math.floor(Math.random() * topics.length);

  return `
Give a narrative writing prompt for a ${level} level student in a topic of ${topics[randomIndex]}
`
}
