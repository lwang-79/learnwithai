import { Box, Divider, HStack, Spacer, Stack, Tag, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { SubStatus } from "@/pages/account"
import PlanSubItem from "./PlanSubItem"
import { useContext } from "react";
import SharedComponents from "../Common/SharedComponents";

interface PlanSubListProps {
  subStatus: SubStatus
}

function PlanSubList({ subStatus }: PlanSubListProps) {
  const { currentUser } = useContext(SharedComponents);

  let planSubs = [];

  for (const plan in subStatus) {
    const planName = plan as 'enterprise' | 'professional' | 'personal';
    
    if (!subStatus[planName].id) continue;

    const planSub = subStatus[planName];

    planSubs.push(
      <Stack key={planSub.id} >
        <Divider mb={1} />
        <PlanSubItem planSub={planSub} />
      </Stack>
    )
  }

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'md'}
      p={8}
      w='full'
    >
      <Stack spacing={4}>
        <HStack>
          <Text textTransform='capitalize'>Free Plan</Text>
          <Spacer />
          <Tag borderRadius='full' colorScheme='green'>ACTIVE</Tag>
        </HStack>
        {planSubs}
        {currentUser && 
          <>
            <Divider />
            <VStack align='flex-start' spacing={0}>
              <Text>Current Quota</Text>
              <Text fontSize='sm'>Math questions per day: {currentUser.quota.mathPerDay}</Text>
              <Text fontSize='sm'>Writing per day: {currentUser.quota.writingPerDay}</Text>
              <Text fontSize='sm'>Max saved tests: {currentUser.quota.savedTests}</Text>
              <Text fontSize='sm'>Max saved essays: {currentUser.quota.savedEssays}</Text>
            </VStack>
          </>
        }

      </Stack>
    </Box>
  )
}


export default PlanSubList
