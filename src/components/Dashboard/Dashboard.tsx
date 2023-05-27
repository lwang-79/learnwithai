import { HStack, useColorMode, VStack } from "@chakra-ui/react"
import Highcharts from "highcharts/highstock";
import { useMemo } from "react";
import ColumnChart from "./ColumnChart"
import GameCard from "./GameCard";
import UserCard from "./UserCard";

function Dashboard() {
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
          <UserCard />
          <GameCard />
        </VStack>
        <VStack w='full' maxW='2xl' spacing={4} >
          <ColumnChart />
        </VStack>
      </HStack>
    </>
  )
}

export default Dashboard
