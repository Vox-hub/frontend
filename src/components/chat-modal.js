import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
  FormLabel,
  Stack,
  Box,
} from "@chakra-ui/react";
import LanguageData from "../languages-data.json";

export default function ChatModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        model: `${
          window.localStorage.getItem("model")
            ? window.localStorage.getItem("model")
            : ""
        }`,
        language: `${
          window.localStorage.getItem("language")
            ? window.localStorage.getItem("language")
            : ""
        }`,
        voice: `${
          window.localStorage.getItem("voice")
            ? window.localStorage.getItem("voice")
            : ""
        }`,
      }}
      onSubmit={async ({ model, language, voice }) => {
        setIsLoading(true);
        window.localStorage.setItem("model", model);
        window.localStorage.setItem("language", language);
        window.localStorage.setItem("voice", voice);

        setTimeout(() => {
          setIsLoading(false);
          onClose();
          window.location.href = "/";
        }, 2000);
      }}
    >
      {({ values }) => (
        <Form>
          <ModalContent>
            <ModalHeader>Customize Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <Box>
                  <FormLabel>Model</FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select a model.."
                    name="model"
                  >
                    <option value={"gpt-4"}>ChatGPT 4 </option>
                    <option value={"gpt-3.5-turbo"}>ChatGPT 3.5 turbo</option>
                    <option value={"text-davinci-003"}>ChatGPT 3</option>
                  </Field>{" "}
                </Box>
                <Box>
                  <FormLabel>Language</FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select a language.."
                    name="language"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                  </Field>
                </Box>
                <Box>
                  <FormLabel>Voice</FormLabel>
                  <Field
                    as={Select}
                    placeholder="Select a voice.."
                    name="voice"
                  >
                    {LanguageData.filter(
                      (item) => item.value === values.language
                    ).map(({ voices }) =>
                      voices.map(({ value, title }, idx) => (
                        <option key={idx} value={title}>
                          {title}
                        </option>
                      ))
                    )}
                  </Field>
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
      )}
    </Formik>
  );
}
