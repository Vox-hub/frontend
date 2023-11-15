import { loginWithGoogle, loginWithGithub } from "../services/auth";
import {
  Flex,
  Card,
  Heading,
  Text,
  CardHeader,
  CardBody,
  Stack,
  Button,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";

export default function Signup() {
  const { colorMode } = useColorMode();

  return (
    <Flex h="80vh" justify="center" align="center">
      <Card
        p={6}
        maxW={{ base: "40vh", md: "65vh" }}
        h={"auto"}
        justify="center"
        bg={
          colorMode === "dark"
            ? "blackAlpha.400"
            : useColorModeValue("gray.100", "gray.200")
        }
        rounded="lg"
        boxShadow={"2xl"}
      >
        <CardHeader>
          <Heading>Get started,</Heading>
          <Text color="gray.500">
            Create your account to Voxhubpp to use all features of Voxhub.
          </Text>
        </CardHeader>
        <CardBody>
          <Stack>
            <Button
              onClick={loginWithGoogle}
              colorScheme="red"
              leftIcon={
                <Text fontSize="xl">
                  <AiOutlineGoogle />
                </Text>
              }
            >
              Sign in using google
            </Button>
            <Button
              onClick={loginWithGithub}
              colorScheme="red"
              leftIcon={
                <Text fontSize="xl">
                  <AiOutlineGithub />
                </Text>
              }
              variant="outline"
            >
              Sign up using github
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
