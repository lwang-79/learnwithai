import { HStack, Icon, Text } from "@chakra-ui/react";
import { MoebiusStar } from "./Icons";

function Logo() {
  return (
    <HStack color={"teal.400"}>
      <Icon as={MoebiusStar} boxSize={10} />
      <Text as="b" fontSize="lg">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Text>
    </HStack>
  );
}

export default Logo;
