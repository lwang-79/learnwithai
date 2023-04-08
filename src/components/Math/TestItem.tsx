import { Test } from "@/models"
import { Card, CardBody, HStack, Text } from "@chakra-ui/react"

interface TestItemProps {
  test: Test
}
function TestItem({ test }: TestItemProps) {
  return (
    <>
      <Card shadow='xs'>
        <CardBody>
          <Text whiteSpace='nowrap'>{test.DateTime.slice(0,10)}</Text>
          <Text>Score: {test.correct} / {test.total}</Text>
          {/* <Text whiteSpace='nowrap'>{test.total} Questions</Text>
          <Text color='teal' whiteSpace='nowrap'>{test.correct} Correct</Text>
          <Text color='red' whiteSpace='nowrap'>{test.wrong} Wrong</Text> */}
        </CardBody>
      </Card>
    </>
  )
}

export default TestItem
