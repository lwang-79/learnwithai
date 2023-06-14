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
  Text, 
} from "@chakra-ui/react"
import { GiPlantWatering } from "react-icons/gi";
import { DataStore } from "aws-amplify"
import { useContext, useEffect, useState } from "react";
import { convertCollectionsToString, getCollections, getSeed } from "@/types/game";
import SharedComponents from "../Common/SharedComponents";

function GameCard() {
  const upgradeScore = 100;
  const [ currentScore, setCurrentScore ] = useState<number>(0);
  const [ imageWidth, setImageWidth ] = useState(0);
  const [ collections, setCollections ] = useState<Map<string, number>>(new Map());
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const user = dataStoreUser!;

  useEffect(() => {
    if (!user.gameData) return;

    // const date1 = new Date();
    // const data2 = new Date(user.gameData.startDate);
    // const diffTime = Math.abs(date1.getTime() - data2.getTime());
    // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // const currentScore = user.gameData.score - diffDays * 20;

    // if (currentScore < 0) {
    //   setCurrentScore(0);
    //   return;
    // }
    // setCurrentScore(currentScore);

    setCurrentScore(user.gameData.score);

    const collections = getCollections(user.gameData.collections);
    setCollections(collections);
  }, [currentScore, user.gameData]);

  const plantButtonClickedHandler = async () => {
    const seed = getSeed(user);
    const currentUser = await DataStore.query(User, user.id);
    setDataStoreUser(
      await DataStore.save(User.copyOf(currentUser!, (updated) => {
        updated.gameData = {
          startDate: new Date().toLocaleString('sv-SE').slice(0, 10),
          level: 0,
          score: 0,
          seed: seed,
          collections: '[]'
        }
      }))
    );
  }

  const upgradeButtonClickedHandler = async () => {
    if (!user.gameData) return;

    setCurrentScore(currentScore - upgradeScore);

    const currentUser = await DataStore.query(User, user.id);
    if (!currentUser) return;
    
    const updatedUser = await DataStore.save(User.copyOf(currentUser, (updated) => {
      if (!updated.gameData) {
        return;
      }

      if (updated.gameData.level === 4) {
        const map = getCollections(updated.gameData.collections);

        if (map.has(updated.gameData.seed)) {
          map.set(updated.gameData.seed, map.get(updated.gameData.seed) + 1);
        } else {
          map.set(updated.gameData.seed, 1);
        }

        setCollections(map);
        const collectionsString = convertCollectionsToString(map);

        updated.gameData = {
          startDate: new Date().toLocaleString('sv-SE').slice(0, 10),
          level: 0,
          score: updated.gameData.score - upgradeScore,
          seed: getSeed(updated),
          collections: collectionsString
        }

      } else {
        updated.gameData = {
          ...updated.gameData,
          startDate: new Date().toLocaleString('sv-SE').slice(0, 10),
          level: updated.gameData.level + 1,
          score: updated.gameData.score - upgradeScore
        }
      }
    }));
    setDataStoreUser(updatedUser);
  }

  const imageLoadHandler = (event: any) => {
    setImageWidth(event.target.width);
  }

  return (
    <Card w='full'>
      <CardBody>
        {!user.gameData ? (
          <Button
            variant='ghost'
            size='sm'
            onClick={plantButtonClickedHandler}
          >
            Plant
          </Button>
        ) : (
          <>
            <HStack>
              <HStack spacing={4}>
                {[...collections.entries()].map(([key, value]) => (
                  <HStack key={`${key}-${value}`} align='flex-end'>
                    <Image
                      src={`game/${key}-4.png`}
                      h='30px'
                      alt='plant'
                    />
                    <Text fontSize='xs'>{value}</Text>
                  </HStack>
                ))}
              </HStack>
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
            <HStack px={3} h='150px' w='full' position='relative'>
              <Image
                src={`game/${user.gameData.seed}-${user.gameData.level}.png`}
                h='150px'
                alt='plant'
                position='absolute'
                left={`${120 - imageWidth / 2}px`}
                onLoad={imageLoadHandler}
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
            </HStack>
          </>
        )}
        
      </CardBody>
      
    </Card>
  )
}

export default GameCard
