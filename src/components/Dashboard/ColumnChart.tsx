import { 
  Card, 
  CardBody, 
  CircularProgress, 
  HStack, 
  Icon,
  IconButton, 
  Radio, 
  RadioGroup, 
  Spacer, 
  Text
} from "@chakra-ui/react";
import Highcharts from "highcharts/highstock";
import { HighchartsReact } from "highcharts-react-official";
import { useEffect, useState } from "react";
import { Statistic } from "@/models";
import { ChartColors } from "@/types/color";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

interface ColumnChartProps {
  daily: Statistic[];
}

function ColumnChart({ daily }: ColumnChartProps) {
  const [ options, setOptions ] = useState<any>();
  const [ category, setCategory ] = useState<string>('Math');
  const [ type, setType ] = useState<string>('Daily');
  const today = new Date();
  const [ currentMonth, setCurrentMonth ] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    setData();
  }, [category, currentMonth, type]);

  const setData = async () => {
    const statisticData = daily.filter(
      d => d.date.includes(currentMonth.toLocaleString('sv-SE').slice(0,7))
    ).sort((a, b) => a.date > b.date ? 1 : -1);

    let data: Record<string, number> = {};

    if (category === 'Math') {
      data = statisticData.reduce((acc: { [key: string]: number }, { date, mathCorrect, mathWrong }) => {
        acc[date] = (Number(mathCorrect) + Number(mathWrong));
        return acc;
      }, {});
    } else {
      data = statisticData.reduce((acc: { [key: string]: number }, { date, writing }) => {
        acc[date] = Number(writing);
        return acc;
      }, {});
    }

    const lineData: [number, number][] = [];
    const columnData: [number, number][] = [];

    let totalDays = 0;

    if (currentMonth.toLocaleString('sv-SE').slice(0,7) === today.toLocaleString('sv-SE').slice(0,7)) {
      totalDays = today.getDate();
    } else {
      const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      dateObj.setDate(dateObj.getDate() - 1);
      totalDays = dateObj.getDate();
    }

    let previousCount = 0;
    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i+1);

      const dateInMs = currentDay.getTime();
      const dateString = currentDay.toLocaleDateString('sv-SE');

      const currentCount = data[dateString]?? 0;

      lineData.push([dateInMs, currentCount + previousCount]);
      columnData.push([dateInMs, currentCount]);
      previousCount += currentCount;
    }

    setOptions({
      accessibility: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: '',
      },
      chart: {
        height: '33%',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: null
        },
        labels: {
          align: 'right',
          style: {
            color: '#718096'
          }
        }

      },
      time:{
        useUTC: false,
      },
      yAxis: {
        gridLineColor: '#718096',
        gridLineDashStyle: 'Dot',
        title: {
          text: '',
        },
        labels: {
          style: {
            color: '#718096'
          }
        }
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d',
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: false,
          },
          borderRadius: 4
        },
        series: {
          borderWidth: 0,
        },
        area: {
          dataLabels: {
            enabled: false,
          },
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                  enabled: true
              }
            }
          }
        }
      },
      series: type === 'Daily' ? [{
        type: 'column',
        name: category === 'Math' ? 'Questions' : 'Essays',
        color: ChartColors[0],
        data: columnData
      }] : [{
        type:'area',
        name: 'Accumulated',
        color: ChartColors[0],
        data: lineData
      }],
      legend: false,
    });

  }


  return (
    <Card w='full'>
      <CardBody w= 'full'>
        <HStack w='full' mb={2}>
          <RadioGroup onChange={setCategory} value={category} size='sm'>
            <HStack>
              <Radio value='Math'>Math</Radio>
              <Radio value='Writing'>Writing</Radio>
            </HStack>
          </RadioGroup>
          
          <Spacer />
          <HStack>
            <IconButton 
              variant='ghost'
              size='sm'
              aria-label='Previous Month'
              icon={<Icon as={MdNavigateBefore} boxSize={6} />}
              onClick={()=>setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            />
            <Text fontSize='sm'>{monthNames[currentMonth.getMonth()]}</Text>
            <IconButton 
              variant='ghost'
              size='sm'
              aria-label='Previous Month'
              icon={<Icon as={MdNavigateNext} boxSize={6} />}
              onClick={()=>setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              isDisabled={currentMonth.toLocaleString('sv-SE').slice(0,7) === today.toLocaleString('sv-SE').slice(0,7)}
            />
          </HStack>

          <Spacer />

          <RadioGroup onChange={setType} value={type} size='sm'>
            <HStack>
              <Radio value='Daily'>Daily</Radio>
              <Radio value='Cumulative'>Cumulative</Radio>
            </HStack>
          </RadioGroup>

        </HStack>

        {options ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
          ) : (
          <CircularProgress isIndeterminate />
          )
        }
      </CardBody>
    </Card>
  )
}

export default ColumnChart
