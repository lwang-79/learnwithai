import { Test } from "@/models"
import { Card, CardBody, Text } from "@chakra-ui/react"

interface TestItemProps {
  test: Test
}
function TestItem({ test }: TestItemProps) {
  return (
    <>
      <Card shadow='xs'>
        <CardBody p={4}>
          <Text fontSize='xs'>{(new Date(test.DateTime)).toLocaleString('sv-SE')}</Text>
          <Text fontSize='sm'>Score: {test.correct} / {test.total}</Text>
        </CardBody>
      </Card>
    </>
  )
}

export default TestItem
