import { QuestionLevel } from "../types";
import { ChatCompletionRequestMessage } from "openai";
import { mathTemplate } from "./math";

export function generateProbabilityPrompt(
  level: QuestionLevel,
): ChatCompletionRequestMessage[] {
  const random = Math.random();

  switch (level) {
    case QuestionLevel.Year1:
    case QuestionLevel.Year2:
    case QuestionLevel.Year3:
    case QuestionLevel.Year4:
      if (random < 0.8) {
        return lowSingleEventPrompt();
      } else {
        return lowTwoEventsPrompt();
      }
    case QuestionLevel.Year5:
      if (random < 0.5) {
        return lowSingleEventPrompt();
      } else if (random < 0.9) {
        return lowTwoEventsPrompt();
      } else {
        return middleTwoEventsPrompt();
      }
    case QuestionLevel.Year6:
      if (random < 0.4) {
        return lowTwoEventsPrompt();
      } else if (random < 0.7) {
        return middleTwoEventsPrompt();
      } else {
        return highThreeEventsPrompt();
      }
    default:
      if (random < 0.8) {
        return highThreeEventsPrompt();
      } else {
        return middleTwoEventsPrompt();
      }
  }
}

function lowSingleEventPrompt() {
  const condition = `
  1. Single Event Probability.
  2. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  A bag contains 6 red balls and 4 blue balls. If a ball is randomly selected from the bag, what is the probability of selecting a red ball?
  `;

  const answer = `3 / 5`;

  const workout = `
  There are 6 red balls and 4 blue balls in the bag, making a total of 10 balls. The probability of selecting a red ball can be calculated by dividing the number of favorable outcomes (red balls) by the total number of possible outcomes (all balls).

  Probability of selecting a red ball = Number of red balls / Total number of balls
  Probability of selecting a red ball = 6 / 10, simplify to 3 / 5
  `;

  const options = `
  A: 2 / 5
  B: 1 / 6
  C: 3 / 5
  D: 1 / 4
  `;

  return mathTemplate(
    "low-level",
    "probability",
    condition,
    question,
    answer,
    workout,
    options,
  );
}

function lowTwoEventsPrompt() {
  const condition = `
  1. Should be a two events probability.
  2. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  A standard six-sided die is rolled twice. What is the probability of rolling two even numbers?
  `;

  const answer = `1/4`;

  const workout = `
To find the probability, we need to determine the number of favorable outcomes and divide it by the total number of possible outcomes.

Possible outcomes from rolling a six-sided die twice = 6 x 6 = 36

Out of these six outcomes, three of them are even numbers: 2, 4, and 6. Therefore, there is a 3/6 or 1/2 chance of rolling an even number on the first roll.

Since the first roll does not affect the second roll, the probability of rolling an even number on the second roll remains the same, 1/2.

To find the probability of both events occurring (rolling two even numbers), we multiply the probabilities:

Probability = (1/2) x (1/2) = 1/4
  `;

  const options = `
  A: 1/2
  B: 1/3
  C: 1/4
  D: 1/5
  `;

  return mathTemplate(
    "low-level",
    "two events probability",
    condition,
    question,
    answer,
    workout,
    options,
  );
}

function middleTwoEventsPrompt() {
  const condition = `
  1. More than 2 different possible events.
  2. Ask for the 2nd events' probability.
  3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  In a bag, there are 5 red balls, 3 blue balls, and 2 green balls. If two balls are randomly drawn from the bag without replacement, what is the probability of selecting a red ball on the second draw, given that the first ball drawn was blue?
  `;

  const answer = `1/6`;

  const workout = `
  To calculate the probability of selecting a red ball on the second draw, given that the first ball drawn was blue, we need to consider the two scenarios separately: drawing a blue ball on the first draw and drawing a red ball on the second draw.

  Scenario 1: Drawing a blue ball on the first draw:
  In the bag, there are a total of 10 balls. Since the first ball drawn was blue, there are now 2 blue balls remaining in the bag. So, the probability of drawing a blue ball on the first draw is 3/10.
  
  Scenario 2: Drawing a red ball on the second draw, given that the first ball was blue:
  After removing one blue ball from the bag, there are 9 balls left. Out of these, 5 are red balls. So, the probability of drawing a red ball on the second draw, given that the first ball was blue, is 5/9.
  
  To find the probability of both events occurring consecutively, we multiply the probabilities of the two scenarios:
  
  Probability = (3/10) * (5/9)
  Probability = 1/6  `;

  const options = `
  A: 3/8
  B: 1/8
  C: 1/6
  D: 1/5
  `;

  return mathTemplate(
    "middle-level",
    "conditional probability",
    condition,
    question,
    answer,
    workout,
    options,
  );
}

function highThreeEventsPrompt() {
  const condition = `
  1. Three events probability.
  4. Choose numbers and units that are appropriate for the context of the story, making sure they are challenging to work with.  `;

  const question = `
  In a bag, there are 6 red balls, 4 blue balls, and 2 green balls. Three balls are randomly drawn from the bag without replacement. What is the probability of drawing exactly 2 red balls and 1 blue ball?
  `;

  const answer = `30.30%`;

  const workout = `
  To calculate the probability of drawing exactly 2 red balls and 1 blue ball, we need to consider the different scenarios in which this can occur.

  Scenario 1: Red-Red-Blue
  
  Scenario 2: Red-Blue-Red
  
  Scenario 3: Blue-Red-Red
  
  We need to consider all three scenarios because the order in which the balls are drawn matters.
  
  Now, we can calculate the probability using these scenarios:
  
  Probability of drawing exactly 2 red balls and 1 blue ball = Probability of scenario 1 + Probability of scenario 2 + Probability of scenario 3
  
  Probability of drawing exactly 2 red balls and 1 blue ball = (6/12) * (5/11) * (4/10) + (6/12) * (4/11) * (5/10) + (4/12) * (6/11) * (5/10)
  
  The probability is 0.3030 or 30.30%.
  `;

  const options = `
  A: 46.33%
  B: 25.80%
  C: 30.30%
  D: 67.45%
  `;

  return mathTemplate(
    "high-level",
    "probability",
    condition,
    question,
    answer,
    workout,
    options,
  );
}
