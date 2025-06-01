import { Avatar, Heading, HStack, Tag, VStack } from "@chakra-ui/react";

function Introduction() {
  return (
    <VStack w="full" pt={4}>
      <Heading size="md" color="orange">
        Welcome to StudyWithAI MiniClass
      </Heading>
      <HStack spacing={4} p={4}>
        <Avatar
          borderWidth="2px"
          borderColor="gray.200"
          size="lg"
          src="/classroom/teacher-0.png"
        />
        <Tag
          p={4}
          colorScheme="blue"
        >{`Greetings! I am Ms. Lepilio, one of your teachers in MiniClass. The MiniClass is a powerful feature that enables you to explore a wide range of subjects. To begin, enter your desired subject and topic for learning. For instance, if you're a year-4 student aiming to grasp the math ratio concept, input "math" as the subject, "ratio" as the topic, and "year-4" as the level.`}</Tag>
      </HStack>
      <HStack spacing={4} p={4}>
        <Avatar
          borderWidth="2px"
          borderColor="gray.200"
          size="lg"
          src="/classroom/teacher-1.png"
        />
        <Tag
          p={4}
          colorScheme="orange"
        >{`Hi I am Ms. Cheung, It's a pleasure to meet you all! Another example, if you're a high school student seeking to discuss the Chinese poem "满江红" with AI students and teachers, input "Chinese" as the subject, "满江红" as the topic, and "high school" as the level.`}</Tag>
      </HStack>
      <HStack spacing={4} p={4}>
        <Avatar
          borderWidth="2px"
          borderColor="gray.200"
          size="lg"
          src="/classroom/teacher-2.png"
        />
        <Tag
          p={4}
          colorScheme="blue"
        >{`Hello I am Mr. Furgerson, I'm excited to be here and looking forward to getting to know each one of you! Don't forget, you have the option to set the class duration using the round option and can pause the class if it becomes too fast-paced for you.`}</Tag>
      </HStack>
    </VStack>
  );
}

export default Introduction;
