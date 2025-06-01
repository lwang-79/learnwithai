import {
  Box,
  Divider,
  HStack,
  Spacer,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { SubStatus } from "@/pages/account";
import PlanSubItem from "./PlanSubItem";
import { useContext } from "react";
import SharedComponents from "../Common/SharedComponents";

interface PlanSubListProps {
  subStatus: SubStatus;
}

function PlanSubList({ subStatus }: PlanSubListProps) {
  const { dataStoreUser } = useContext(SharedComponents);

  let planSubs = [];

  for (const plan in subStatus) {
    const planName = plan as "enterprise" | "professional" | "personal";

    if (!subStatus[planName].id) continue;

    const planSub = subStatus[planName];

    planSubs.push(
      <Stack key={planSub.id}>
        <Divider mb={1} />
        <PlanSubItem planSub={planSub} />
      </Stack>,
    );
  }

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"md"}
      p={8}
      w="full"
    >
      <Stack spacing={4}>
        <HStack>
          <Text textTransform="capitalize">Free Plan</Text>
          <Spacer />
          <Tag borderRadius="full" colorScheme="green">
            ACTIVE
          </Tag>
        </HStack>
        {planSubs}
        {dataStoreUser && (
          <>
            <Divider />
            <VStack align="flex-start" spacing={0}>
              <Text>Current Quota</Text>
              <HStack w="full">
                <Text fontSize="sm">Math questions per day</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.mathPerDay}</Text>
              </HStack>
              <HStack w="full">
                <Text fontSize="sm">Writing per day</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.writingPerDay}</Text>
              </HStack>
              <HStack w="full">
                <Text fontSize="sm">Max saved questions</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.savedQuestions}</Text>
              </HStack>
              <HStack w="full">
                <Text fontSize="sm">Max saved tests</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.savedTests}</Text>
              </HStack>
              <HStack w="full">
                <Text fontSize="sm">Max saved essays</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.savedEssays}</Text>
              </HStack>
              <HStack w="full">
                <Text fontSize="sm">Max rounds in MiniClass</Text>
                <Spacer />
                <Text fontSize="sm">{dataStoreUser.quota!.classroomRound}</Text>
              </HStack>
            </VStack>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default PlanSubList;
