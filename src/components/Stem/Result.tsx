import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ResultProps {
  result: {
    total: number;
    correct: number;
  };
}
function Result({ result }: ResultProps) {
  const score = (100 * result.correct) / result.total;
  const head =
    score == 100 ? (
      <Heading size="md">Fantastic!</Heading>
    ) : score >= 90 ? (
      <Heading size="md">Perfect!</Heading>
    ) : score >= 80 ? (
      <Heading size="md">Well done!</Heading>
    ) : score >= 60 ? (
      <Heading size="md">Keep pushing forward!</Heading>
    ) : (
      <Heading size="md">Good start, keep practice!</Heading>
    );

  return (
    <VStack mt={2}>
      {head}
      <Text>Total: {result.total}</Text>
      <Text>Correct: {result.correct}</Text>
      <Text>Score: {score.toFixed(0)}%</Text>
    </VStack>
  );
}

export default Result;
