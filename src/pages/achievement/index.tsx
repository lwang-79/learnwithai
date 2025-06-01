import Layout from "@/components/Common/Layout";
import SharedComponents from "@/components/Common/SharedComponents";
import { Badge, User } from "@/models";
import { getBadgeProgress } from "@/types/badge";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { DataStore, SortDirection } from "aws-amplify";
import { useContext, useEffect, useState } from "react";

function Achievement() {
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const [availableBadges, setAvailableBadges] = useState<Badge[]>([]);
  const [badgeProgress, setBadgeProgress] = useState<number[]>([]);
  const [myBadges, setMyBadges] = useState<Badge[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<Badge>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const {
    isOpen: isOpenBadge,
    onOpen: onOpenBadge,
    onClose: onCloseBadge,
  } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (!dataStoreUser) {
      return;
    }

    DataStore.query(Badge, (b) => b.isVisible.eq(true), {
      sort: (s) => s.startDate(SortDirection.DESCENDING),
    }).then((badges) => {
      setAvailableBadges(badges);
      const progress = [];
      for (const badge of badges) {
        progress.push(getBadgeProgress(badge, dataStoreUser));
      }
      setBadgeProgress(progress);
    });
  }, [dataStoreUser]);

  useEffect(() => {
    if (!dataStoreUser || !dataStoreUser.badges) {
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
      setMyBadges(
        myBadges.sort((a, b) => (a.startDate > b.startDate ? -1 : 1)),
      );
    };

    getMyBadges(dataStoreUser.badges);
  }, [dataStoreUser]);

  const badgeClaimClickedHandler = async (badge: Badge, index: number) => {
    if (!dataStoreUser) return;

    setIsUpdating(true);

    let ownedBadges = [badge.id];

    if (dataStoreUser.badges) {
      ownedBadges = [...dataStoreUser.badges!, badge.id];
    }

    const currentUser = await DataStore.query(User, dataStoreUser.id);
    if (!currentUser) return;

    const updatedUser = await DataStore.save(
      User.copyOf(currentUser, (updated) => {
        updated.badges = ownedBadges;
      }),
    );
    setDataStoreUser(updatedUser);

    setMyBadges([badge, ...myBadges]);

    toast({
      description: `Congratulations! You have been awarded the "${badge.name}" badge.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    setIsUpdating(false);
  };

  const badgeClickedHandler = (badge: Badge) => {
    setSelectedBadge(badge);
    setTimeout(() => {
      onOpenBadge();
    }, 100);
  };

  return (
    <Layout>
      {dataStoreUser && (
        <HStack w="full" align="flex-start">
          <Card w="30%" h="80vh">
            <CardHeader>
              <Heading size="md">To be collected</Heading>
            </CardHeader>
            <CardBody>
              <Wrap spacing={4}>
                {availableBadges.map((badge, index) => {
                  if (
                    !dataStoreUser.badges ||
                    !dataStoreUser.badges.includes(badge.id)
                  ) {
                    return (
                      <WrapItem key={`${badge.id}-${index}`}>
                        <VStack>
                          <Tooltip hasArrow label={badge.description}>
                            <Image
                              src={
                                badgeProgress[index] >= 100
                                  ? badge.image
                                  : `https://dummyimage.com/80&text=badge`
                              }
                              alt={badge.name}
                              boxSize="100px"
                              rounded="xl"
                              onClick={
                                badgeProgress[index] < 100 || isUpdating
                                  ? undefined
                                  : () => badgeClaimClickedHandler(badge, index)
                              }
                              sx={
                                badgeProgress[index] < 100 || isUpdating
                                  ? { cursor: "not-allowed" }
                                  : { cursor: "pointer" }
                              }
                            />
                          </Tooltip>
                          <Tooltip
                            hasArrow
                            label={`Progress: ${badgeProgress[index] > 100 ? 100 : badgeProgress[index].toFixed(0)}%`}
                          >
                            <VStack w="full">
                              <Text as="b" fontSize="xs">
                                {badge.name}
                              </Text>
                              <Progress
                                w="full"
                                colorScheme="teal"
                                size="xs"
                                value={badgeProgress[index]}
                              />
                            </VStack>
                          </Tooltip>
                        </VStack>
                      </WrapItem>
                    );
                  }
                })}
              </Wrap>
            </CardBody>
          </Card>
          <Card w="70%" h="80vh">
            <CardHeader>
              <Heading size="md">My Collections</Heading>
            </CardHeader>
            <CardBody>
              <Wrap spacing={4}>
                {myBadges.map((badge, index) => (
                  <WrapItem key={`${badge.id}_${index}`}>
                    <VStack>
                      <Image
                        src={badge.image}
                        alt={badge.name}
                        boxSize="100px"
                        rounded="xl"
                        onClick={() => badgeClickedHandler(badge)}
                        sx={{ cursor: "pointer" }}
                      />
                      <Text as="b" fontSize="xs">
                        {badge.name}
                      </Text>
                    </VStack>
                  </WrapItem>
                ))}
              </Wrap>
            </CardBody>
          </Card>

          <Modal isOpen={isOpenBadge} onClose={onCloseBadge}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedBadge?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <Image
                    src={selectedBadge?.image}
                    alt={selectedBadge?.name}
                    boxSize="200px"
                    rounded="xl"
                  />
                  <Text>{selectedBadge?.description}</Text>
                </VStack>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      )}
    </Layout>
  );
}

export default Achievement;
