import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Stack,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { updateUser } from "../services/user";

export default function ProfileModal({ user, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        firstname: `${user?.firstname}`,
        lastname: `${user?.lastname}`,
        email: `${user?.email}`,
        openai_key: `${user?.openai_key || ""}`,
      }}
      onSubmit={async ({ firstname, lastname, openai_key }) => {
        const id = user?.userId;
        setIsLoading(true);

        try {
          const data = [
            { propName: "firstname", value: firstname },
            { propName: "lastname", value: lastname },
            { propName: "openai_key", value: openai_key },
          ];

          await updateUser(id, data).then(() => {
            onClose();
            setIsLoading(false);

            toast({
              title: "Account updated.",
              status: "success",
              duration: 1500,
              isClosable: true,
            });

            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
          });
        } catch (err) {
          setIsLoading(false);
          toast({
            title: "Something is wrong" + err,
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      }}
    >
      <Form>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Box>
                <FormLabel>First name</FormLabel>
                <Field as={Input} type="text" name="firstname" />
              </Box>
              <Box>
                <FormLabel>Last name</FormLabel>
                <Field as={Input} type="text" name="lastname" />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Field as={Input} disabled type="email" name="email" />
              </Box>
              <Box>
                <FormLabel>Openai API key</FormLabel>
                <Field as={Input} type="text" name="openai_key" />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Saving.."
              colorScheme="red"
              mr={3}
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              colorScheme="red"
              variant="outline"
              mr={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Formik>
  );
}
