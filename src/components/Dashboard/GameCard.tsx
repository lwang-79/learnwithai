import { User } from "@/models"
import { 
  Box,
  Button, 
  Card, 
  CardBody, 
  HStack, 
  Icon,
  IconButton, 
  Image, 
  Progress, 
  Spacer, 
  Text
} from "@chakra-ui/react"
import { GiPlantWatering } from "react-icons/gi";
import { DataStore } from "aws-amplify"
import { useEffect, useState } from "react";

interface GameCardProps {
  user: User
}
function GameCard({user}: GameCardProps) {
  const upgradeScore = 100;
  const [ currentScore, setCurrentScore ] = useState<number>(0);

  useEffect(() => {
    if (!user.gameData) return;

    const date1 = new Date();
    const data2 = new Date(user.gameData.startDate);
    const diffTime = Math.abs(date1.getTime() - data2.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const currentScore = user.gameData.score - diffDays * 20;

    if (currentScore < 0) {
      setCurrentScore(0);
      return;
    }
    setCurrentScore(currentScore);
  }, []);

  const plantButtonClickedHandler = async () => {
    await DataStore.save(User.copyOf(user, (updated) => {
      updated.gameData = {
        startDate: new Date().toLocaleString('sv-SE').slice(0, 10),
        level: 0,
        score: 0
      }
    }));
  }

  const upgradeButtonClickedHandler = async () => {
    if (!user.gameData) return;

    setCurrentScore(currentScore - upgradeScore);
    
    await DataStore.save(User.copyOf(user, (updated) => {
      if (!updated.gameData) {
        return;
      }
      
      updated.gameData = {
        startDate: new Date().toLocaleString('sv-SE').slice(0, 10),
        level: updated.gameData.level + 1,
        score: updated.gameData.score - upgradeScore
      }
    }));
  }


  return (
    <Card w='full'>
      <CardBody>
        <HStack>
          {!user.gameData && 
            <Button
              variant='ghost'
              size='sm'
              onClick={plantButtonClickedHandler}
            >
              Plant
            </Button>
          }
          <Spacer />
          <IconButton
              variant='ghost'
              size='sm'
              aria-label='Previous Month'
              isDisabled={currentScore < upgradeScore}
              icon={<Icon as={GiPlantWatering} boxSize={6} />}
              onClick={upgradeButtonClickedHandler}
            />
        </HStack>
        {user.gameData &&
        <HStack px={3} h='150px' w='full' position='relative'>
          <Image
            src={`game/tree-${user.gameData.level}.png`}
            h='150px'
            position='absolute'
            left='50px'
          />
          <Box className='watering-progress' right='-47px'>
            <Progress
              value={currentScore}
              width='120px'
              height='8px'
              max={upgradeScore}
              colorScheme='teal'
            />
          </Box>
        </HStack>}
      </CardBody>
      
    </Card>
  )
}

export default GameCard
