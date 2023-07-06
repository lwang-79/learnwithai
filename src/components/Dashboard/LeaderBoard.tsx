import { RankingItem, RankingType } from "@/models"
import { 
  Card, 
  Icon,
  HStack, 
  VStack, 
  CardBody,
  Text,
  Spacer,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Tag
} from "@chakra-ui/react";
import { DataStore, SortDirection } from "aws-amplify";
import { useContext, useEffect, useState } from "react"
import { FaMedal } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import SharedComponents from "../Common/SharedComponents";

function LeaderBoard() {
  const [ yesterdayMathRankingItem, setYesterdayMathRankingItem] = useState<RankingItem>();
  const [ lastMonthMathRankingItem, setLastMonthMathRankingItem] = useState<RankingItem>();
  const [ thisMonthMathRankingItem, setThisMonthMathRankingItem] = useState<RankingItem>();
  const [ yesterdayWritingRankingItem, setYesterdayWritingRankingItem] = useState<RankingItem>();
  const [ lastMonthWritingRankingItem, setLastMonthWritingRankingItem] = useState<RankingItem>();
  const [ thisMonthWritingRankingItem, setThisMonthWritingRankingItem] = useState<RankingItem>();
  const { isDataStoreReady } = useContext(SharedComponents);

  useEffect(() => {

    const yesterday = (new Date(new Date().setDate(new Date().getDate() - 1))).toLocaleString('sv-SE').slice(0,10);
    let thisMonth = (new Date()).toLocaleString('sv-SE').slice(0,7);
    if (new Date().getDate() === 1) {
      thisMonth = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toLocaleString('sv-SE').slice(0,7);
    }
    const lastMonth = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toLocaleString('sv-SE').slice(0,7);
    
    DataStore.query(RankingItem, (item) => 
      item.and(item => [
        item.type.eq(RankingType.MATH_CORRECT_NUMBER_BY_DAY),
      ]),
      {
        sort: (item) => item.date(SortDirection.DESCENDING)
      }
    ).then(items => {
      setYesterdayMathRankingItem(items[0]);
    });

    DataStore.query(RankingItem, (item) => 
      item.and(item => [
        item.type.eq(RankingType.MATH_CORRECT_NUMBER_BY_MONTH),
        item.date.eq(thisMonth)
      ])
    ).then(items => setThisMonthMathRankingItem(items[0]));

    DataStore.query(RankingItem, (item) => 
      item.and(item => [
        item.type.eq(RankingType.MATH_CORRECT_NUMBER_BY_MONTH),
        item.date.eq(lastMonth)
      ])
    ).then(items => setLastMonthMathRankingItem(items[0]));

    DataStore.query(RankingItem, (item) =>
      item.and(item => [
        item.type.eq(RankingType.WRITING_NUMBER_BY_DAY),
        item.date.eq(yesterday)
      ])
    ).then(items => setYesterdayWritingRankingItem(items[0]));

    DataStore.query(RankingItem, (item) =>
      item.and(item => [
        item.type.eq(RankingType.WRITING_NUMBER_BY_MONTH),
        item.date.eq(thisMonth)
      ])
    ).then(items => setThisMonthWritingRankingItem(items[0]));

    DataStore.query(RankingItem, (item) =>
      item.and(item => [
        item.type.eq(RankingType.WRITING_NUMBER_BY_MONTH),
        item.date.eq(lastMonth)
      ])
    ).then(items => setLastMonthWritingRankingItem(items[0]));
      
  },[isDataStoreReady]);
  return (
    <>
      <HStack w='full'>
        <Card w='50%'>
          <CardBody>
            <VStack>
              <HStack>
                <Icon as={GiTrophyCup} boxSize={8} color='orange' />
                <VStack spacing={0}>
                  <Heading size='sm' color='blue.400'>MATH WINNER</Heading>
                  <Text fontSize='xs' color='blue.400'>{yesterdayMathRankingItem?.date}</Text>
                </VStack>
                <Icon as={GiTrophyCup} boxSize={8} color='orange' />
              </HStack>

              {[0,1,2].map((name, index) => 
                <Tag rounded='full' colorScheme='blue' key={`${name}-${index}`} w='full'>
                  <HStack 
                    px={4} py={1} 
                    spacing={4}
                    w='full'
                  >
                    <Icon 
                      as={FaMedal} 
                      boxSize={6}
                      color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'orange'}  />
                    <Text fontWeight='extrabold'>{yesterdayMathRankingItem?.names[index]}</Text>
                    <Spacer />
                    <Text fontWeight='extrabold'>{yesterdayMathRankingItem?.values[index]}</Text>
                  </HStack>
                </Tag>
              )}
            </VStack>
          </CardBody>
        </Card>

        <Card w='50%'>
          <CardBody>
            <VStack>
              <HStack>
                <Icon as={GiTrophyCup} boxSize={8} color='orange' />
                <VStack spacing={0}>
                  <Heading size='sm' color='blue.400'>WRITING WINNER</Heading>
                  <Text fontSize='xs' color='blue.400'>{yesterdayWritingRankingItem?.date}</Text>
                </VStack>
                <Icon as={GiTrophyCup} boxSize={8} color='orange' />
              </HStack>
              
              {[0,1,2].map((name, index) => 
                <Tag rounded='full' colorScheme='blue' key={`${name}-${index}`} w='full'>
                  <HStack 
                    px={4} py={1} 
                    spacing={4}
                    w='full'
                  >
                    <Icon 
                      as={FaMedal} 
                      boxSize={6}
                      color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'orange'}  />
                    <Text fontWeight='extrabold'>{yesterdayWritingRankingItem?.names[index]}</Text>
                    <Spacer />
                    <Text fontWeight='extrabold'>{yesterdayWritingRankingItem?.values[index]}</Text>
                  </HStack>
                </Tag>
              )}
            </VStack>
          </CardBody>
        </Card>
      </HStack>
      <Card w='full'>
        <CardBody>
          <HStack>
            <TableContainer w='50%'>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>
                      <VStack>
                        <Text>Math Leader Board</Text>
                      </VStack>
                    </Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[1,2,3,4,5].map((name, index) =>{
                    return (
                      <Tr key={`${name}-${index}`}>
                        <Td py={0}>
                          <Tag rounded='full' colorScheme='pink'>{name}</Tag>
                        </Td>
                        <Td>{thisMonthMathRankingItem?.names[index]??'-'}</Td>
                        <Td isNumeric>{thisMonthMathRankingItem?.values[index]??'-'}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th>
                      <VStack>
                        <Text>
                        {thisMonthMathRankingItem?.date??'-'}
                        </Text>
                      </VStack>
                    </Th>
                    <Th></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <TableContainer w='50%'>
              <Table size='sm'>
                <Thead>
                  <Tr>
                  <Th></Th>
                    <Th>
                      <VStack>
                        <Text>Writing Leader Board</Text>
                      </VStack>
                    </Th>
                    <Th isNumeric></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[1,2,3,4,5].map((name, index) =>{
                    return (
                      <Tr key={`${name}-${index}`}>
                        <Td py={0}>
                          <Tag rounded='full' colorScheme='purple'>{name}</Tag>
                        </Td>
                        <Td>{thisMonthWritingRankingItem?.names[index]??'-'}</Td>
                        <Td isNumeric>{thisMonthWritingRankingItem?.values[index]??'-'}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th>
                      <VStack>
                        <Text>
                        {thisMonthWritingRankingItem?.date??'-'}
                        </Text>
                      </VStack>
                    </Th>
                    <Th></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}

export default LeaderBoard
