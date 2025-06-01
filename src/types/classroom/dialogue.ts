import { APIName, APIOperation } from "../types";
import { APIPost } from "../utils";
import { Character, ChatMessage, ClassroomFunction } from "./types";

const getDialogue = async (messages: ChatMessage[], apiName: APIName) => {
  const request = {
    body: {
      operation: APIOperation.Chat,
      messages: messages,
      function: ClassroomFunction,
      // source: QuestionSource.ChatGPT4
    },
  };

  const body = await APIPost(apiName, "/", request);

  if (!body.data) {
    throw new Error("No data returned");
  }

  let words = "";
  let nextRole = "";

  try {
    words = JSON.parse(body.data).words;
    nextRole = JSON.parse(body.data).nextRole;
    if (!words) {
      words = JSON.parse(body.data);
    }
  } catch (error) {
    console.log(body.data);
    console.log(error);
    words = body.data;
  }

  if (!words) {
    throw new Error("No words returned");
  }

  if (words.slice(0, 20).includes(": ")) {
    const index = words.indexOf(":");
    words = words.substring(index + 2);
  }

  return { nextRole, words };
};

const getNextRole = (
  characters: Character[],
  currentRole: string,
  nextRole: string,
): string => {
  if (nextRole) {
    const character = characters.find(
      (character) => character.role === nextRole || character.name === nextRole,
    );
    if (character) {
      return `${character.role}-${character.name}`;
    }
  }
  const nonTeacherCharacters = characters.filter(
    (character) => character.role !== "teacher",
  );

  if (currentRole.includes("teacher")) {
    const randomNonTeacherCharacter =
      nonTeacherCharacters[
        Math.floor(Math.random() * nonTeacherCharacters.length)
      ];
    return `${randomNonTeacherCharacter.role}-${randomNonTeacherCharacter.name}`;
  }

  const random = Math.random();

  if (random < 0.8) {
    const teacherCharacter = characters.find(
      (character) => character.role === "teacher",
    )!;
    return `${teacherCharacter.role}-${teacherCharacter.name}`;
  }

  const nonTeacherAndCurrentCharacters = nonTeacherCharacters.filter(
    (character) => character.name !== currentRole.split("-")[1],
  );

  const randomNonTeacherCharacter =
    nonTeacherAndCurrentCharacters[
      Math.floor(Math.random() * nonTeacherAndCurrentCharacters.length)
    ];

  return `${randomNonTeacherCharacter.role}-${randomNonTeacherCharacter.name}`;
};

export { getDialogue, getNextRole };
