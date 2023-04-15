import { Statistic, User } from "@/models"
import { 
  Card, 
  CardBody, 
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
import { useEffect, useState } from "react";
import { TbWriting } from "react-icons/tb";

interface UserCardProps {
  user: User 
}
function UserCard({user}: UserCardProps) {
  const today = new Date();
  const currentDay = today.toLocaleString('sv-SE').slice(0, 10);
  const currentMonth = today.toLocaleString('sv-SE').slice(0, 7);
  const currentYear = today.toLocaleString('sv-SE').slice(0, 4);
  const [ daily, setDaily ] = useState<Statistic>();
  const [ monthly, setMonthly ] = useState<Statistic>();
  const [ yearly, setYearly ] = useState<Statistic>();
  const [ mathLevel, setMathLevel ] = useState(0);
  const [ writingLevel, setWritingLevel ] = useState(0);

  useEffect(() => {
    if (user.daily) {
      const daily = user.daily.find(stat => stat.date === currentDay);
      setDaily(daily);

      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - 7);
      const weeklyData = user.daily.filter(stat => stat.date >= dateObj.toLocaleString('sv-SE').slice(0, 10));

      const mathTotal = weeklyData.reduce((acc, { mathCorrect }) => acc + mathCorrect, 0);
      const writingTotal = weeklyData.reduce((acc, { writing }) => acc + writing, 0);
    
      if (mathTotal > 500) {
        setMathLevel(4);
      } else if (mathTotal > 250) {
        setMathLevel(3);
      } else if (mathTotal > 100) {
        setMathLevel(2);
      } else if (mathTotal > 50) {
        setMathLevel(1);
      } else {
        setMathLevel(0);
      }

      if (writingTotal > 15) {
        setWritingLevel(4);
      } else if (writingTotal > 10) {
        setWritingLevel(3);
      } else if (writingTotal > 5) {
        setWritingLevel(2);
      } else if (writingTotal > 3) {
        setWritingLevel(1);
      } else {
        setWritingLevel(0);
      }
    }

    if (user.monthly) {
      const monthly = user.monthly.find(stat => stat.date === currentMonth);
      setMonthly(monthly);
    }

    if (user.yearly) {
      const yearly = user.yearly.find(stat => stat.date === currentYear);
      setYearly(yearly);
    }

    }, []);

  return (
    <Card w='full'>
      <CardBody>
        <Text mb={4}>Welcome {user.username}</Text>
        <VStack align='flex-start'>
          <HStack w='full'>
            <Icon as={BiMath} color='teal' />
            <Text>Math:</Text>
            <Spacer />
            <Tag size='sm' colorScheme='teal' rounded='full'>Level-{mathLevel}</Tag>
          </HStack>
          {daily && daily.mathCorrect + daily.mathWrong > 0 ? (
            <Text fontSize='sm'>Today: {daily.mathCorrect} / {daily.mathCorrect + daily.mathWrong} {(daily.mathCorrect / (daily.mathCorrect + daily.mathWrong) * 100).toFixed(0)}%</Text>
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
            <Text fontSize='sm'>This month: {monthly.mathCorrect} / {monthly.mathCorrect + monthly.mathWrong} {(monthly.mathCorrect / (monthly.mathCorrect + monthly.mathWrong) * 100).toFixed(0)}%</Text>
          }

          {yearly && yearly.mathCorrect + yearly.mathWrong > 0 &&
            <Text fontSize='sm'>This year: {yearly.mathCorrect} / {yearly.mathCorrect + yearly.mathWrong} {(yearly.mathCorrect / (yearly.mathCorrect + yearly.mathWrong) * 100).toFixed(0)}%</Text>
          }

          <Spacer />
          <HStack w='full'>
            <Icon as={TbWriting} color='teal' />
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

        
      </CardBody>
    </Card>
  )
}

export default UserCard
