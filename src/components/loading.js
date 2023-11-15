import React from "react";
import { Flex, Spinner, Text, HStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex textAlign={"center"} h="100vh" justify="center" align="center">
      <HStack>
        <Spinner />
        <Text>loading..</Text>
      </HStack>
    </Flex>
  );
}
