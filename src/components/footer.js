import ScrollAnimation from "react-animate-on-scroll";
import {
  Box,
  Heading,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsTwitter, BsInstagram, BsTelegram, BsYoutube } from "react-icons/bs";

const Logo = () => {
  return (
    <Heading fontSize="3xl">
      Audio
      <Text as="span" color="red.300">
        GPT
      </Text>{" "}
    </Heading>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <ScrollAnimation animateIn="fadeInUp">
      <Box
        mt="10vh"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Box>
                <Logo color={useColorModeValue("gray.700", "white")} />
              </Box>
              <Text fontSize={"sm"}>
                © 2022 Voxhub inc. All rights reserved
              </Text>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Links</ListHeader>
              <Link>Home</Link>
              <Link>Pricing</Link>
              <Link>Contact us</Link>
              <Link>Sign in</Link>
              <Link>Sign up</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Policies</ListHeader>
              <Link>Terms of service</Link>
              <Link>Privacy policy</Link>
              <Link>Refund policy</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Follow us</ListHeader>
              <Flex w="15vh" fontSize="xl" justify="space-around">
                <Link color="red.400">
                  <BsInstagram />
                </Link>
                <Link color="red.400">
                  <BsTwitter />
                </Link>
                <Link color="red.400">
                  <BsYoutube />
                </Link>
                <Link color="red.400">
                  <BsTelegram />
                </Link>
              </Flex>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </ScrollAnimation>
  );
}
