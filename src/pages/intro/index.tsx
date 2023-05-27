import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  Box,
  Spacer,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineSchool } from 'react-icons/md';

export default function Introduction() {
  return (
    <Container maxW={'5xl'} pb={4}>
      <Box className='section section-1'>
        <Flex mt={4}>
          <Link href='/'>
            <Box color={'teal.400'}>
              <Icon as={MdOutlineSchool}  boxSize={8}/> 
              <Text as='b'>
                LearnWithAI
              </Text>
            </Box>
          </Link>
          <Spacer />
          <Box>
            <Link href='/login'>
              <Button variant={'ghost'} rounded='full' >
                Login
              </Button>
            </Link>
            <Link href='/signup'>
              <Button variant={'ghost'} rounded='full' >
                Sign up
              </Button>
            </Link>
          </Box>
        </Flex>

        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Unlock your full {' '}
            <Text as={'span'} color={'teal.400'}>
            potential
            </Text>
          </Heading>
          <Text maxW={'3xl'} textAlign='justify' px={{base: 2, md: 5}}>
            {`Welcome to LearnWithAI, our AI-powered educational app that provides a personalized learning experience to help you achieve your academic goals.`}
          </Text>
          <Text maxW={'3xl'} textAlign='justify' px={{base: 2, md: 5}}>
            {`Our app is designed to make learning fun and engaging, with a comprehensive library of questions and exercises that cover math, reading, and writing skills. With the latest advancements in AI technology, our app provides real-time feedback and personalized learning paths, tailored to your individual needs.`}
          </Text>
          <Text maxW={'3xl'} textAlign='justify' px={{base: 2, md: 5}}>
            {`Whether you're a student preparing for an exam, or a teacher looking for a tool to support your students, LearnWithAI has something for everyone. We are committed to making education accessible and affordable, and our AI technology makes learning more efficient and effective than ever before.`}
          </Text>
          <Text maxW={'3xl'} textAlign='justify' px={{base: 2, md: 5}}>
            {`So why wait? Join our community of learners and start your educational journey today!`}
          </Text>
          <Stack spacing={6} direction={'row'} >
            <Link href='/signup'>
              <Button px={6} variant='solid'>
                Start free
              </Button>
            </Link>
            <Link href='/intro#more' >
              <Button px={6}>
                Learn more
              </Button>
            </Link>
          </Stack>

        </Stack>
      </Box>
    </Container>
  );
}