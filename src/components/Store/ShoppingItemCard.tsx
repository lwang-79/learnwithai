import { ShoppingItem, ShoppingItemCategory, User } from "@/models";
import { redeemReward, redeemSeed } from "@/types/store";
import { sesSendEmail } from "@/types/utils";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DataStore } from "aws-amplify";
import { useContext, useRef, useState } from "react";
import { SWACoins } from "../Common/Icons";
import SharedComponents from "../Common/SharedComponents";

interface ShoppingItemCardProps {
  item: ShoppingItem;
}
function ShoppingItemCard({ item }: ShoppingItemCardProps) {
  const { dataStoreUser, setDataStoreUser } = useContext(SharedComponents);
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const redeemButtonClickedHandler = async () => {
    if (!dataStoreUser) return;
    setIsProcessing(true);

    const user = await DataStore.query(User, dataStoreUser.id);

    if (
      !user ||
      !user.gameData ||
      !user.gameData.coins ||
      user.gameData.coins < item.price
    ) {
      toast({
        description: `You do not have enough coins.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsProcessing(false);
      onCloseAlert();
      return;
    }

    //     try {
    //       if (
    //         dataStoreUser &&
    //         dataStoreUser.notification &&
    //         dataStoreUser.notification.emails.length > 0
    //       ) {
    //         const message = `${dataStoreUser.username} redeemed a reward cost ${item.price} coins.
    // Name: ${item.name}
    // Description: ${item.description}
    //         `;

    //         sesSendEmail(
    //           dataStoreUser.notification.emails as string[],
    //           `${process.env.NEXT_PUBLIC_APP_NAME} redeem notification`,
    //           message,
    //           'notification@StudyWithAI.pro'
    //         );
    //       } else {
    //         console.log('no email');
    //         toast({
    //           description: `Please configure notification in your profile first.`,
    //           status: 'error',
    //           duration: 5000,
    //           isClosable: true,
    //           position: 'top'
    //         });

    //         onCloseAlert();
    //         setIsProcessing(false);
    //         return;
    //       }

    //     } catch (error) {
    //       console.error(error);
    //       toast({
    //         description: `Failed to send notification. Please make sure the email address is valid.`,
    //         status: 'error',
    //         duration: 5000,
    //         isClosable: true,
    //         position: 'top'
    //       });

    //       onCloseAlert();
    //       setIsProcessing(false);
    //       return;
    //     }

    //     const updatedUser = await DataStore.save(User.copyOf(user, updated => {
    //       updated.gameData!.coins = user.gameData!.coins! - item.price
    //     }));

    try {
      if (item.category === ShoppingItemCategory.REWARD) {
        const updatedUser = await redeemReward(user, item);
        setDataStoreUser(updatedUser);

        toast({
          description: `Redeemed successful. Notification has been sent.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (item.category === ShoppingItemCategory.SEED) {
        const updatedUser = await redeemSeed(user, item);
        setDataStoreUser(updatedUser);

        toast({
          description: `A new seed has been planted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      onCloseAlert();
      setIsProcessing(false);
      return;
    }

    onCloseAlert();
    setIsProcessing(false);
  };

  return (
    <>
      <Card w="220px" h="full">
        <CardHeader>{item.name}</CardHeader>
        <Image
          src={item.image ?? ""}
          fallbackSrc="https://dummyimage.com/80&text=Image"
          alt="item image"
          boxSize="220px"
        />
        <CardBody>
          <VStack align="flex-start">
            <Text fontSize="sm">{item.description}</Text>
          </VStack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Tooltip label="Redeem" hasArrow>
            <Button w="full" colorScheme="orange" onClick={onOpenAlert}>
              <HStack>
                <Icon as={SWACoins} boxSize={6} />
                <Text>{item.price}</Text>
              </HStack>
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure?
            </AlertDialogHeader>

            <AlertDialogBody>
              {item.category === ShoppingItemCategory.REWARD
                ? `${item.price} coins will be deducted. Notification will be sent to your guardians' email address.`
                : `${item.price} coins will be deducted.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlert}
                rounded={"full"}
                px={6}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                rounded={"full"}
                isLoading={isProcessing}
                px={6}
                onClick={redeemButtonClickedHandler}
                ml={3}
              >
                Redeem
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ShoppingItemCard;
