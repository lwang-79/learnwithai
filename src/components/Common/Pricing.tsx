import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import useStorage from '@/hooks/useStorage';
import { Quota } from '@/types/quota';

export function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  const { getItem } = useStorage();

  const isAuthenticated = (
    getItem('isAuthenticated', 'local') === 'true'
  );

  const [ href, setHref ] = useState('/signup');

  useEffect(() => {
    const href = isAuthenticated ?
      '/profile' :
      '/login';

    setHref(href);
  },[isAuthenticated]);

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Start free. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>

        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Free forever
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              {/* <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                basic trip plan
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.free.trips} trips
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.free.daysPerTrip} days / trip
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.free.activitiesPerDay} activities / day
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.free.expensesPerTrip} extra expenses / trip
              </ListItem> */}
            </List>
            <Box w="80%" pt={7}>
              <Link href='/signup'>
                <Button w="full" colorScheme="red" variant="outline">
                  Start free
                </Button>
              </Link>
             
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              rounded='full'
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.100', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Personal
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  8
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                {/* <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  cost reports
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {Quota.personal.trips} trips
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {Quota.personal.daysPerTrip} days / trip
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {Quota.personal.activitiesPerDay} activities / day
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {Quota.personal.expensesPerTrip} extra expenses / trip
                </ListItem> */}
              </List>
              <Box w="80%" pt={7}>
                <Link href={`${href}`}>
                  <Button w="full" colorScheme="red">
                    Start trial
                  </Button>
                </Link>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Professional
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                20
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              {/* <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                traffic information
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.professional.trips} trips
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.professional.daysPerTrip} days / trip
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.professional.activitiesPerDay} activities / day
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.professional.expensesPerTrip} extra expenses / trip
              </ListItem> */}
            </List>
            <Box w="80%" pt={7}>
              <Link href={`${href}`}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Link>
            </Box>
          </VStack>
        </PriceWrapper>

        {/* <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Enterprise
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="3xl" color="gray.500">
                contact us
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                customization
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.enterprise.trips} trips
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.enterprise.daysPerTrip} days / trip
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.enterprise.activitiesPerDay} activities / day
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {Quota.enterprise.expensesPerTrip} extra expenses / trip
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Link href={`${href}#enterprise-plan`}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Link>
            </Box>
          </VStack>
        </PriceWrapper> */}
      </Stack>
    </Box>
  );
}