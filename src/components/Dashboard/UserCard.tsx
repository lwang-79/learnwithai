import { Statistic } from "@/models"
import { 
  Card, 
  CardBody, 
  Divider, 
  HStack, 
  Icon,
  Link, 
  Spacer, 
  Tag, 
  Text, 
  VStack 
} from "@chakra-ui/react";
import { BiMath } from "react-icons/bi";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { TbWriting } from "react-icons/tb";
import { getLevel } from "@/types/user";
import SharedComponents from "../Common/SharedComponents";

function UserCard() {
  const today = new Date();
  const currentDay = today.toLocaleString('sv-SE').slice(0, 10);
  const currentMonth = today.toLocaleString('sv-SE').slice(0, 7);
  const currentYear = today.toLocaleString('sv-SE').slice(0, 4);
  const [ daily, setDaily ] = useState<Statistic>();
  const [ monthly, setMonthly ] = useState<Statistic>();
  const [ yearly, setYearly ] = useState<Statistic>();
  const [ mathLevel, setMathLevel ] = useState(0);
  const [ writingLevel, setWritingLevel ] = useState(0);
  const { dataStoreUser } = useContext(SharedComponents);
  const user = dataStoreUser!;

  useEffect(() => {
    if (user.daily) {
      const daily = user.daily.find(stat => stat.date === currentDay);
      setDaily(daily);

      const { mathLevel, writingLevel } = getLevel(user.daily);
      setMathLevel(mathLevel);
      setWritingLevel(writingLevel);
    }

    if (user.monthly) {
      const monthly = user.monthly.find(stat => stat.date === currentMonth);
      setMonthly(monthly);
    }

    if (user.yearly) {
      const yearly = user.yearly.find(stat => stat.date === currentYear);
      setYearly(yearly);
    }

  }, [currentDay, currentMonth, currentYear, user.daily, user.monthly, user.yearly]);

  return (
    <Card w='full'>
      <VStack align='flex-start' mb={4}>
        <Text mx={6} mt={4}>Welcome {user.username}</Text>
        <Divider />
        <VStack align='flex-start' px={6} w='full' spacing={1}>
          <HStack w='full'>
            <Icon as={BiMath} color='orange.500' />
            <Text>Math:</Text>
            <Spacer />
            <Tag size='sm' colorScheme='teal' rounded='full'>Level-{mathLevel}</Tag>
          </HStack>
          {daily && daily.mathCorrect + daily.mathWrong > 0 ? (
            <HStack w='full'>
              <Text fontSize='sm'>Today: {daily.mathCorrect} / {daily.mathCorrect + daily.mathWrong}</Text>
              <Spacer />
              <Text fontSize='sm'>{(daily.mathCorrect / (daily.mathCorrect + daily.mathWrong) * 100).toFixed(0)}%</Text>
            </HStack>
            
          ) : (
            <HStack>
              <Text fontSize='sm'>
                You have not practiced any math questions today! 
                <Link 
                  as={NextLink} 
                  href={'/math'} 
                  color='teal' 
                  _hover={{textDecoration: 'none'}}
                >
                  {` >> Start`}
                </Link>
              </Text>
            </HStack>
          )}

          {monthly && monthly.mathCorrect + monthly.mathWrong > 0 &&
            <HStack w='full'>
              <Text fontSize='sm'>This month: {monthly.mathCorrect} / {monthly.mathCorrect + monthly.mathWrong}</Text>
              <Spacer />
              <Text fontSize='sm'>{(monthly.mathCorrect / (monthly.mathCorrect + monthly.mathWrong) * 100).toFixed(0)}%</Text>
            </HStack>
            
          }

          {yearly && yearly.mathCorrect + yearly.mathWrong > 0 &&
            <HStack w='full'>
              <Text fontSize='sm'>This year: {yearly.mathCorrect} / {yearly.mathCorrect + yearly.mathWrong}</Text>
              <Spacer />
              <Text fontSize='sm'>{(yearly.mathCorrect / (yearly.mathCorrect + yearly.mathWrong) * 100).toFixed(0)}%</Text>
            </HStack>
          }
        </VStack>
        <Divider />
        <VStack align='flex-start' px={6} w='full' spacing={1}>
          <HStack w='full'>
            <Icon as={TbWriting} color='orange.500' />
            <Text>Writing:</Text>
            <Spacer />
            <Tag size='sm' colorScheme='teal' rounded='full'>Level-{writingLevel}</Tag>
          </HStack>

          {daily && daily.writing > 0 ? (
            <Text fontSize='sm'>Today: {daily.writing}</Text>
          ) : (
            <HStack>
              <Text fontSize='sm'>
                You have not practiced writing today! 
                <Link 
                  as={NextLink} 
                  href={'/writing'} 
                  color='teal' 
                  _hover={{textDecoration: 'none'}}
                >
                  {` >> Start`}
                </Link>
              </Text>
            </HStack>
          )}

          {monthly && monthly.writing > 0 &&
            <Text fontSize='sm'>This month: {monthly.writing}</Text>
          }

          {yearly && yearly.writing > 0 &&
            <Text fontSize='sm'>This year: {yearly.writing}</Text>
          }
        </VStack>

        
      </VStack>
    </Card>
  )
}

export default UserCard
