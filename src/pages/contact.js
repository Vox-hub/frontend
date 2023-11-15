import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { sendContact } from "../services/contact";
import {
  Flex,
  Stack,
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  useColorModeValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const { colorMode } = useColorMode();
  const toast = useToast();

  const handleForm = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const response = await sendContact(values);

      setIsLoading(false);
      resetForm();
      if (response.status === 200) {
        toast({
          status: "success",
          title: "Informations sent!",
          description: "We will answer you as soon as possible.",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          status: "error",
          title: "Error! try again.",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        status: "error",
        title: "Error!",
        description: `${err}`,
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{ fullname: "", email: "", message: "" }}
      onSubmit={handleForm}
    >
      <Form>
        <Flex py={14} textAlign="center" direction="column" align="center">
          <Heading as="h1" fontSize="4xl">
            Get in touch
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={"gray.500"}>
            Fill out this form, and we will answer as soon as possible!
          </Text>
          <Card
            mt="4vh"
            p={6}
            w={{ base: "40vh", md: "60vh" }}
            bg={
              colorMode === "dark"
                ? "blackAlpha.400"
                : useColorModeValue("gray.100", "gray.200")
            }
            rounded="lg"
            boxShadow={"xl"}
          >
            <CardBody>
              <Stack spacing={8}>
                <Box>
                  <FormLabel>Full name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BsPerson />
                    </InputLeftElement>
                    <Input as={Field} name="fullname" type="text" size="md" />
                  </InputGroup>{" "}
                </Box>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineEmail />
                    </InputLeftElement>
                    <Input as={Field} name="email" type="text" size="md" />
                  </InputGroup>{" "}
                </Box>
                <Box>
                  <FormLabel>Message</FormLabel>
                  <Field as={Textarea} name="message" />
                </Box>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Sending.."
                  colorScheme="red"
                >
                  Send
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </Form>
    </Formik>
  );
}
