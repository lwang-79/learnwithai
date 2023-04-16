import { Box, Divider, HStack, Spacer, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { SubStatus } from "@/pages/account"
import PlanSubItem from "./PlanSubItem"

interface PlanSubListProps {
  subStatus: SubStatus
}

function PlanSubList({ subStatus }: PlanSubListProps) {

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
      // boxShadow={'lg'}
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
      </Stack>
    </Box>
  )
}


export default PlanSubList
