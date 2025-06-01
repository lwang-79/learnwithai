import { Essay, QuestionSet, Test } from "@/models";
import { API, DataStore } from "aws-amplify";
import { APIName } from "./types";

async function sesSendEmail(
  to: string[],
  subject: string,
  message: string,
  from: string = "notification@StudyWithAI.pro",
) {
  const body = {
    from: from,
    to: to,
    subject: subject,
    message: message,
  };

  await fetch(
    "https://lelnuzxenk.execute-api.ap-southeast-2.amazonaws.com/production/sendbasicemail",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const APIPost = async (
  apiName: APIName,
  path: string,
  request: {
    [key: string]: any;
  },
): Promise<{ data: any | undefined; error: string | undefined }> => {
  let response;
  let body;
  try {
    response = await API.post(apiName, path, request);

    if (response.errorMessage) {
      console.error(response.errorMessage);
      return {
        data: undefined,
        error: response.errorMessage,
      };
    }

    body = JSON.parse(response.body);

    if (body.error) {
      if (body.error.error && body.error.error) {
        console.error(body.error.error.message);
        return {
          data: undefined,
          error: body.error.error.message,
        };
      }
      console.error(body.error);
      return {
        data: undefined,
        error: body.error,
      };
    }

    return {
      data: body.data,
      error: undefined,
    };
  } catch (error: any) {
    console.error(error.message ?? error);

    return {
      data: undefined,
      error: error.message ?? error,
    };
  }
};

function download(content: string, fileName: string, contentType: string) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

async function downloadData() {
  const questionSets = await DataStore.query(QuestionSet);
  if (questionSets.length > 0) {
    console.log("download questionSet");
    const jsonData = JSON.stringify(questionSets, null, "\t");
    download(jsonData, "questionSet.json", "text/plain");
  }

  const tests = await DataStore.query(Test);
  if (tests.length > 0) {
    console.log("download test");
    const jsonData = JSON.stringify(tests, null, "\t");
    download(jsonData, "test.json", "text/plain");
  }

  const essays = await DataStore.query(Essay);
  if (essays.length > 0) {
    console.log("download essay");
    const jsonData = JSON.stringify(essays, null, "\t");
    download(jsonData, "essay.json", "text/plain");
  }
}

async function importData(owner: string) {
  try {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener(
      "change",
      async () => {
        if (input.files) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = async function (event) {
            if (event.target) {
              const text = event.target.result;

              if (file.name.includes("questionSet")) {
                const questionSets = JSON.parse(
                  text as string,
                ) as QuestionSet[];

                for (const questionSet of questionSets) {
                  const { createdAt, updatedAt, ...destructedQuestionSet } =
                    questionSet;
                  const newQuestionSet = new QuestionSet({
                    ...destructedQuestionSet,
                    owner: owner,
                  });
                  await DataStore.save(newQuestionSet);
                }
              } else if (file.name.includes("test")) {
                const tests = JSON.parse(text as string) as Test[];

                for (const test of tests) {
                  const { createdAt, updatedAt, ...destructedTest } = test;
                  const newTest = new Test({
                    ...destructedTest,
                    owner: owner,
                  });
                  await DataStore.save(newTest);
                }
              } else if (file.name.includes("essay")) {
                const essays = JSON.parse(text as string) as Essay[];

                for (const essay of essays) {
                  const { createdAt, updatedAt, ...destructedEssay } = essay;
                  const newEssay = new Essay({
                    ...destructedEssay,
                    owner: owner,
                  });
                  await DataStore.save(newEssay);
                }
              } else {
                console.error("Invalid file name");
              }
            }
          };
          reader.readAsText(file);
        }
      },
      false,
    );

    input.click();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { APIPost, downloadData, isValidEmail, importData, sesSendEmail };
