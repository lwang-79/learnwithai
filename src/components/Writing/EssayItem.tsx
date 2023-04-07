import { Essay } from "@/models"
import { EssayType } from "@/types/types"
import { HStack, Text } from "@chakra-ui/react"

interface EssayItem {
  essay: Essay
}

function EssayItem({ essay }: EssayItem) {
  return (
    <HStack align='flex-end'>
      <Text whiteSpace='nowrap'>{essay.DateTime.slice(0,10)}</Text>
      <Text whiteSpace='nowrap'>{essay.level}</Text>
      <Text color='teal' whiteSpace='nowrap'>{essay.type === EssayType.Narrative ? 'Creative Writing': 'Persuasive Essay'}</Text>
      <Text 
        fontSize='sm'
        whiteSpace='nowrap' 
        overflow='hidden' 
        textOverflow='ellipsis'
      >
        {essay.text}
      </Text>
    </HStack>
  )
}

export default EssayItem
