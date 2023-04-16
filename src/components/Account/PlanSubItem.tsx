import { HStack, Spacer, Stack, Tag, Text } from "@chakra-ui/react"

export interface PlanSub {
  id: string,
  plan_name: string,
  create_time: string,
  status: 'ACTIVE'|'CANCELLED'
}

interface PlanSubItemProps {
  planSub: PlanSub
}

function PlanSubItem({ planSub }: PlanSubItemProps) {
  return (
    <Stack spacing={1}>
      <HStack>
        <Text textTransform='capitalize'>{planSub.plan_name} plan</Text>
        <Spacer />
        {planSub.status == 'ACTIVE' ? (
          <Tag borderRadius='full' colorScheme='green'>{planSub.status}</Tag>
        ) : (
          <Tag borderRadius='full'>{planSub.status}</Tag>
        )}
      </HStack>
      <HStack>
        <Text fontSize='xs'>ID: {planSub.id}</Text>
        <Spacer />
        <Text fontSize='xs'>Since {planSub.create_time.slice(0,10)}</Text>
      </HStack>
    </Stack>
  )
}

export default PlanSubItem
