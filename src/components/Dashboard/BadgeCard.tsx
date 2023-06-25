import { Badge } from "@/models";
import { Box, Card, Divider, Image, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import { DataStore } from "aws-amplify";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SharedComponents from "../Common/SharedComponents";

function BadgeCard() {
  const { dataStoreUser, isDataStoreReady } = useContext(SharedComponents);
  const router = useRouter();
  const [ myBadges, setMyBadges ] = useState<Badge[]>([]);


  useEffect(() => {
    if (!dataStoreUser || !dataStoreUser.badges || !isDataStoreReady) {
      return;
    }

    const getMyBadges = async (badgeIds: string[]) => {
      const myBadges: Badge[] = [];
      for (const badgeId of badgeIds) {
        const badge = await DataStore.query(Badge, badgeId);
        if (badge) {
          myBadges.push(badge);
        }
      }

      setMyBadges(myBadges.sort((a, b) => a.startDate > b.startDate ? -1 : 1).slice(0, 10));
    }

    getMyBadges(dataStoreUser.badges);
    
  },[dataStoreUser, isDataStoreReady]);

  return (
    <Card w='full'>
      <VStack align='flex-start' mb={4}>
        <Text  mx={6} mt={4}>Your Achievement</Text>
        <Divider />
        <Box  
          px={4} w='full'
          cursor='pointer'
          onClick={() => {router.push('/achievement')}}
        >
          {myBadges.length === 0 ? 'No badge yet >> Claim' : 
            <Wrap spacing={2}>
              {myBadges.map(badge => (
                <WrapItem key={badge.id}>
                  <Image 
                    src={badge.image} 
                    alt={badge.name} 
                    boxSize= {myBadges.length < 4 ? '80px' : '50px'}
                    rounded='xl'
                  />
                </WrapItem>
              ))}
            </Wrap>
          }
        </Box>
      </VStack>
      
    </Card>
  )
}

export default BadgeCard
