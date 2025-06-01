import { BadQuestionSet } from "@/models";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import QuestionItem from "./QuestionItem";

function QuestionPanel() {
  const [questions, setQuestions] = useState<BadQuestionSet[]>();

  useEffect(() => {
    const subscription = DataStore.observeQuery(
      BadQuestionSet,
      Predicates.ALL,
      {
        sort: (q) => q.createdAt(SortDirection.DESCENDING),
      },
    ).subscribe(({ items }) => {
      setQuestions(items);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="full">
        {questions &&
          questions.map((question, index) => (
            <QuestionItem key={index} question={question} />
          ))}
      </VStack>
    </>
  );
}

export default QuestionPanel;
