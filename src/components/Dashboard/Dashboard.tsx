import { User } from "@/models";
import { HStack, useColorMode, VStack } from "@chakra-ui/react"
import Highcharts from "highcharts/highstock";
import { useMemo } from "react";
import ColumnChart from "./ColumnChart"
import GameCard from "./GameCard";
import UserCard from "./UserCard";

interface DashboardProps {
  user: User
}
function Dashboard({ user }: DashboardProps) {
  const { colorMode } = useColorMode();

  // set highcharts color mode
  useMemo(() => {
    Highcharts.theme = colorMode == 'dark' ? {
      chart: {
        backgroundColor: {
          stops: [
              [0, 'rgba(255, 255, 255, 0.05)'],
          ]
        }
      },
      legend: {
        itemStyle: {
          color: 'rgb(158, 161, 176)'
        },
        itemHoverStyle: {
          color: 'gray'
        }
      }
    } : {

    }

    Highcharts.setOptions(Highcharts.theme);
  }, [colorMode]);
  
  return (
    <>
      <HStack py={4} w='full' spacing={4} align='flex-start'>
        <VStack w='full' maxW='xs' spacing={4} >
          <UserCard user={user} />
          <GameCard user={user} />
        </VStack>
        <VStack w='full' maxW='2xl' spacing={4} >
          {user.daily &&<ColumnChart daily={user.daily} />}
        </VStack>
      </HStack>
    </>
  )
}

export default Dashboard
