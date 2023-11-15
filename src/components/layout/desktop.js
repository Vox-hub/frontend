import { Flex, Link, Text, Heading, HStack, Button } from "@chakra-ui/react";
import { Link as Routing } from "react-router-dom";

export default function LayoutDesktop() {
  return (
    <>
      <Flex
        className="animate__animated animate__fadeInDown"
        style={{ position: "relative", zIndex: 2 }}
        p="5vh 5vh 5vh 5vh"
        justify={"space-around"}
        align="center"
      >
        <Flex align="center">
          <Heading fontSize="3xl">
            Vox
            <Text as="span" color="red.300">
              Hub
            </Text>{" "}
          </Heading>
        </Flex>
        <Flex>
          <HStack spacing="5vh">
            <Routing as={Link} to="/home">
              Home
            </Routing>
            <Routing as={Link} to="/pricing">
              Pricing
            </Routing>
            <Routing as={Link} to="/contact-us">
              Contact us
            </Routing>
          </HStack>
        </Flex>
        <Flex>
          <Button as={Routing} to="/signin" mr="2.5vh " colorScheme="red">
            Sign in
          </Button>
          <Button as={Routing} to="/signup" colorScheme="red" variant="outline">
            Get started
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
