import { QuestionSet } from '@/types/types'
import { Divider, Heading, HStack, Progress, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface ResultProps {
  questionSets: QuestionSet[]
}
function Result({ questionSets }: ResultProps) {
  let correct = 0;
  const resultsByConcept: {concept: string, total: number, correct: number}[] = []; 

  for (const question of questionSets) {
    if (question.answer === question.selected) {
      correct++;
    }

    if (!question.concept) {
      continue;
    }

    const existingConcept = resultsByConcept.find(concept => concept.concept === question.concept);

    if (existingConcept) {
      existingConcept.total++;
      if (question.answer === question.selected) {
        existingConcept.correct++;
      }
    } else {
      resultsByConcept.push({concept: question.concept, total: 1, correct: question.answer === question.selected ? 1 : 0});
    }
  }


  const score = 100 * correct / questionSets.length;
  const head = 
    score == 100 ? (<Heading size='md'>😃 Fantastic! 🎉</Heading>) :
    score >= 90 ? (<Heading size='md'>🙂 Perfect! 👏</Heading>) : 
    score >= 80 ? (<Heading size='md'>🤔 Well done! 👍</Heading>) : 
    score >= 60 ? (<Heading size='md'>🫣 Keep pushing forward! 👊</Heading>) : 
    (<Heading size='md'>😓 Good start, keep practice! ✊</Heading>);

  return (
    <VStack mt={6}>
      {head}
      <Text>Total Score: {score.toFixed(0)}%</Text>
      <Divider />
      <HStack w='full'>
        <Text as='b' w='30%'>Total</Text>
        <Progress value={100 * correct / questionSets.length} w='50%'/>
        <Spacer />
        <Text as='b'>{correct}/{questionSets.length}</Text>
      </HStack>
      {resultsByConcept.map((result, index) => 
        <HStack key={`${result.concept}-${index}`} w='full'>
          <Text w='30%'>{result.concept.charAt(0).toUpperCase() + result.concept.slice(1)}</Text>
          <Progress value={100 * result.correct / result.total} w='50%'/>
          <Spacer />
          <Text>{result.correct}/{result.total}</Text>
        </HStack>
      )}
    </VStack>
  )
}

export default Result
