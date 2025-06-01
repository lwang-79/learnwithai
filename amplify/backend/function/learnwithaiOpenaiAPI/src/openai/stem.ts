import { APIResponse, StemConcept, StemQuestion } from "types";
import stem from "../models/mmlu-stem.json";
import science from "../models/mmlu-science.json";

export const getStemQuestions = (
  concepts: StemConcept[],
  level: string,
  questionCount: string,
): APIResponse => {
  const count = Number(questionCount);

  if (
    isNaN(count) ||
    count <= 0 ||
    ["Primary School", "Middle School", "High School", "College"].indexOf(
      level,
    ) === -1
  ) {
    return {
      statusCode: 400,
      error: "Please enter a valid value",
    };
  }

  if (level === "Primary School" || level === "Middle School") {
    level = level === "Middle School" ? "middle" : "elementary";
    const questions = (science as StemQuestion[]).filter(
      (question) => !question.concept.includes(level),
    );

    const randomIndex = Math.floor(Math.random() * (questions.length - count));

    return {
      statusCode: 200,
      data: questions.slice(randomIndex, randomIndex + count),
    };
  }

  if (!concepts || concepts.length === 0) {
    return {
      statusCode: 400,
      error: "Please enter a valid value",
    };
  }

  const questions = (stem as StemQuestion[]).filter(
    (question) =>
      !question.concept.includes(
        level === "College" ? "high_school" : "college",
      ),
  );

  let selectedQuestions: StemQuestion[] = [];
  for (let i = 0; i < count; ) {
    const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
    const questionsInConcept = questions.filter((question) =>
      question.concept.includes(randomConcept.toLowerCase().replace(" ", "_")),
    );

    if (questionsInConcept.length === 0) {
      continue;
    }
    const randomQuestion =
      questionsInConcept[Math.floor(Math.random() * questionsInConcept.length)];

    selectedQuestions.push(randomQuestion);
    i++;
  }

  return {
    statusCode: 200,
    data: selectedQuestions,
  };
};
