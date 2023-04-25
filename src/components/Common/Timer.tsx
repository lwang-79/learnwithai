import { 
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdAvTimer } from "react-icons/md";

interface TimerProps {
  isStopped: boolean
  duration: number
  setDuration: Dispatch<SetStateAction<number>>
}

function Timer({ isStopped, duration, setDuration }: TimerProps) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopped) return;
      setSeconds(prevSeconds => prevSeconds + 1);
      setDuration(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isStopped]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time/3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <HStack>
      <Icon as={MdAvTimer} boxSize={5} color='teal' />
      <Text fontSize='sm'>{formatTime(seconds)}</Text>
    </HStack>
  )
}

export default Timer
