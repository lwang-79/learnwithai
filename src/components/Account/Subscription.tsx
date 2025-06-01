import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import PayPalButtonWrapper from "./PayPalButtonWrapper";
import { PriceWrapper } from "@/components/Common/Pricing";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { LearnwithaiSubscribeMutation } from "@/types/API";
import { User } from "@/models";
import { learnwithaiSubscribe } from "@/graphql/mutations";
import { SubStatus } from "@/pages/account";
import { Quota } from "@/types/quota";
import Support from "@/components/Common/Support";
import { MdCancel, MdCheckCircle } from "react-icons/md";

interface SubscriptionProps {
  subStatus: SubStatus;
  user: User;
  onClose: () => void;
}

function Subscription({ subStatus, user, onClose }: SubscriptionProps) {
  const [planId, setPlanId] = useState<string[]>();
  const [selectedPlan, setSelectedPlan] = useState<
    "personal" | "professional" | "enterprise"
  >();
  const [isInProgress, setIsInProgress] = useState(false);
  const toast = useToast();
  const cancelRef = useRef(null);

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenSupportModal,
    onOpen: onOpenSupportModal,
    onClose: onCloseSupportModal,
  } = useDisclosure();

  useEffect(() => {
    let planId = ["", "", ""];
    if (user.membership!.paypalSubscriptions.personal.length > 0) {
      planId[0] = process.env.NEXT_PUBLIC_PERSONAL_RESUME_PLAN_ID!;
    } else {
      planId[0] = process.env.NEXT_PUBLIC_PERSONAL_PLAN_ID!;
    }

    if (user.membership!.paypalSubscriptions.professional.length > 0) {
      planId[1] = process.env.NEXT_PUBLIC_PROFESSIONAL_RESUME_PLAN_ID!;
    } else {
      planId[1] = process.env.NEXT_PUBLIC_PROFESSIONAL_PLAN_ID!;
    }

    if (user.membership!.paypalSubscriptions.enterprise.length > 0) {
      planId[2] = process.env.NEXT_PUBLIC_ENTERPRISE_RESUME_PLAN_ID!;
    } else {
      planId[2] = process.env.NEXT_PUBLIC_ENTERPRISE_PLAN_ID!;
    }

    setPlanId(planId);
  }, [subStatus, user]);

  const unsubscribe = async (
    planName: "personal" | "professional" | "enterprise",
  ) => {
    setIsInProgress(true);

    const response = (await API.graphql(
      graphqlOperation(learnwithaiSubscribe, {
        operation: "cancel",
        userId: user.id,
        subscriptionId: subStatus[planName].id,
      }),
    )) as GraphQLResult<LearnwithaiSubscribeMutation>;

    if (response.data?.learnwithaiSubscribe?.statusCode == 200) {
      toast({
        description: `${response.data.learnwithaiSubscribe.body} You can manage your subscription from the profile or Paypal console.`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });

      setSelectedPlan(undefined);
      setIsInProgress(false);
      onCloseAlert();
      onClose();
    } else {
      toast({
        description: `Something wrong, please try again later. You can manage your subscription from the profile or Paypal console.`,
        status: "error",
        duration: 30000,
        isClosable: true,
      });

      console.error(response.data?.learnwithaiSubscribe?.body);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}
    >
      <Flex direction="column">
        <Box mt={20}>
          <VStack spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl">
              Manage your subscription
            </Heading>
          </VStack>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            <PriceWrapper>
              <Box py={4} px={12} id="personal-plan">
                <Text fontWeight="500" fontSize="2xl">
                  Personal
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    5
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
                <Text color="orange.500" fontWeight="500" fontSize="lg">
                  7 days free trial
                </Text>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.personal.mathPerDay} math questions per day
                  </ListItem>
                  {/* <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.personal.readingPerDay} reading sets per day
                  </ListItem> */}
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.personal.writingPerDay} writing practice per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Max {Quota.personal.classroomRound} rounds in MiniClass
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Basic reports
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Test mode
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Save questions and test result
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCancel} color="gray.500" />
                    Report notification
                  </ListItem>
                </List>
                <Flex w="full" justify="center">
                  <Box w="80%">
                    {!planId ? null : subStatus.personal.status == "ACTIVE" ? (
                      <VStack pt={7} pb={10} spacing={4}>
                        <Text>You are on this plan</Text>
                        <Button
                          w="full"
                          colorScheme="red"
                          variant="solid"
                          onClick={() => {
                            setSelectedPlan("personal");
                            onOpenAlert();
                          }}
                        >
                          Unsubscribe
                        </Button>
                      </VStack>
                    ) : (
                      <Box pt={6}>
                        <PayPalButtonWrapper
                          type="subscription"
                          planId={planId[0]}
                          userId={user.id}
                          onFinished={onClose}
                        />
                      </Box>
                    )}
                  </Box>
                </Flex>
              </VStack>
            </PriceWrapper>
            <PriceWrapper>
              <Box py={4} px={12} id="professional-plan">
                <Text fontWeight="500" fontSize="2xl">
                  Professional
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    10
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
                <Text color="orange.500" fontWeight="500" fontSize="lg">
                  7 days free trial
                </Text>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.professional.mathPerDay} math questions per day
                  </ListItem>
                  {/* <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.professional.readingPerDay} reading sets per day
                  </ListItem> */}
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.professional.writingPerDay} writing practice per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Max {Quota.professional.classroomRound} rounds in MiniClass
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Basic reports
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Test mode
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Save questions and test result
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Report notification
                  </ListItem>
                </List>
                <Flex w="full" justify="center">
                  <Box w="80%">
                    {!planId ? null : subStatus.professional.status ==
                      "ACTIVE" ? (
                      <VStack pt={7} pb={10} spacing={4}>
                        <Text>You are on this plan</Text>
                        <Button
                          w="full"
                          colorScheme="red"
                          variant="solid"
                          onClick={() => {
                            setSelectedPlan("professional");
                            onOpenAlert();
                          }}
                        >
                          Unsubscribe
                        </Button>
                      </VStack>
                    ) : (
                      <Box pt={6}>
                        <PayPalButtonWrapper
                          type="subscription"
                          planId={planId[1]}
                          userId={user.id}
                          onFinished={onClose}
                        />
                      </Box>
                    )}
                  </Box>
                </Flex>
              </VStack>
            </PriceWrapper>
            {/* <PriceWrapper>
              <Box py={4} px={12} id='enterprise-plan'>
                <Text fontWeight="500" fontSize="2xl">
                  Enterprise
                </Text>
                <HStack justifyContent="center" my="14px">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    customized
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.enterprise.mathPerDay} math questions per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.enterprise.readingPerDay} reading sets per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {Quota.enterprise.writingPerDay} writing practice per day
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Basic reports
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Test mode
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Save questions and test result
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Weekly report notification
                  </ListItem>
                </List>
                <Flex w='full' justify='center' >
                  <Box w="80%">
                    <VStack pt={7} pb={10} spacing={4}>
                      {!planId ? (null) : (subStatus.enterprise.status == 'ACTIVE' ? (
                        <Text>You are on this plan</Text>
                      ) : (
                        <Text>We fit your needs</Text> 
                      ))}
                      
                      <Button 
                        w="full" 
                        colorScheme={'orange'}
                        bg={'orange.400'}
                        _hover={{ bg: 'orange.500' }}
                        rounded="full"
                        onClick={onOpenSupportModal}
                      >
                        Contact us
                      </Button>
                    </VStack>
                  </Box>
                </Flex>
              </VStack>
            </PriceWrapper>           */}
          </Stack>
        </Box>
      </Flex>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Unsubscribe {selectedPlan} plan
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can still use the free plan but some features
              will be not available.
            </AlertDialogBody>
            {isInProgress ? <Progress isIndeterminate size="xs" /> : null}
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
                px={6}
                onClick={() => unsubscribe(selectedPlan!)}
                ml={3}
              >
                Unsubscribe
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpenSupportModal} onClose={onCloseSupportModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Please leave a message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Support onClose={onCloseSupportModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </PayPalScriptProvider>
  );
}

export default Subscription;
