import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Box,
  Input,
  Text,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import plans from "../plans-data.json";
import { AiOutlineSend, AiOutlineAudio, AiOutlineStop } from "react-icons/ai";

export default function ChatWidget(props) {
  const {
    user,
    handleForm,
    subscription,
    seconds,
    isRecording,
    startRecording,
    stopRecording,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!user?.openai_key) setIsDisabled(true);
    else if (isLoading) setIsDisabled(true);
    else {
      setIsDisabled(false);
    }
  }, [user, isLoading]);

  useEffect(() => {
    const getLimit = (plan) => {
      if (plan === plans[0].id) {
        return 60;
      } else if (plan === plans[1].id) {
        return 120;
      } else if (plan === plans[2].id) {
        return 300;
      }
    };

    let plan = subscription?.subscription_plan_id;

    const maxSeconds = getLimit(plan);

    if (seconds === maxSeconds + 1) {
      stopRecording();
    }
  }, [seconds, subscription]);

  return (
    <Tooltip
      display={user?.openai_key && "none"}
      hasArrow
      label={`You are missing your Openai API key!`}
      bg="yellow.300"
      placement="top-end"
      color="black"
      textAlign={"center"}
    >
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        position="fixed"
        bottom="0px"
        p={8}
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Formik
          initialValues={{ prompt: "" }}
          onSubmit={(values, { resetForm }) =>
            handleForm(values, setIsLoading, { resetForm })
          }
        >
          <Form>
            <Flex justify="center" align="center">
              <Flex align="center" width={{ base: "40vh", md: "100vh" }}>
                <Input
                  as={Field}
                  isDisabled={isDisabled}
                  text="text"
                  name="prompt"
                  flex="1"
                  placeholder="Type your message"
                  mr="2"
                />
                {isRecording ? (
                  <Text as="b" fontSize="lg">
                    {formatTime(seconds)}
                  </Text>
                ) : (
                  <IconButton
                    isDisabled={isDisabled}
                    type="submit"
                    isLoading={isLoading}
                    colorScheme="red"
                    aria-label="Send Message"
                    icon={<AiOutlineSend />}
                  />
                )}

                {!isRecording ? (
                  <IconButton
                    isDisabled={isDisabled}
                    onClick={startRecording}
                    colorScheme="red"
                    variant="outline"
                    aria-label="Voice Input"
                    icon={<AiOutlineAudio />}
                    ml="2"
                  />
                ) : (
                  <IconButton
                    onClick={stopRecording}
                    colorScheme="red"
                    variant="outline"
                    aria-label="Voice Input"
                    icon={<AiOutlineStop />}
                    ml="2"
                  />
                )}
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </Tooltip>
  );
}
