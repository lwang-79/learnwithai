import { SystemMessage } from "@/models";
import {
  HStack,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdNotificationsNone } from "react-icons/md";
import { ExternalLink } from "./Icons";

function MessagePopover({ messages }: { messages: SystemMessage[] }) {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size={"md"}
          colorScheme="orange"
          variant="ghost"
          icon={<Icon as={MdNotificationsNone} boxSize={6} />}
          aria-label={"Notifications"}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Messages</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {messages.map((message, index) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

const MessageItem = ({ message }: { message: SystemMessage }) => {
  return (
    <VStack spacing={0} align="flex-start" w="full" py={2}>
      <HStack w="full">
        <Text fontSize="xs" color="gray.500">
          {message.createdAt?.slice(0, 10)}
        </Text>
        <Spacer />
      </HStack>
      <Text size="sm">
        {message.content}
        {message.internalLink && (
          <Link as={NextLink} href={message.internalLink!}>
            <IconButton
              aria-label="open"
              icon={<Icon as={ExternalLink} boxSize={5} />}
              rounded="full"
              size="xs"
              variant="ghost"
            />
          </Link>
        )}
        {message.externalLink && (
          <Link as={NextLink} href={message.externalLink!} target="_blank">
            <IconButton
              aria-label="open"
              icon={<Icon as={ExternalLink} boxSize={5} />}
              rounded="full"
              size="xs"
              variant="ghost"
            />
          </Link>
        )}
      </Text>
    </VStack>
  );
};

export default MessagePopover;
