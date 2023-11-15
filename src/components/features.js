import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FcApproval,
  FcAssistant,
  FcVoicePresentation,
  FcIdea,
  FcSupport
} from "react-icons/fc";
import ScrollAnimation from "react-animate-on-scroll";

const Card = ({ heading, description, icon }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={7}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Features() {
  return (
    <Box mt="7vh" p={4}>
      <ScrollAnimation animateIn="fadeInDown">
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            Why us?
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
            Speak, Connect, Empower with Our Powerful Features
          </Text>
        </Stack>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInUp">
        <Container maxW={"5xl"} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading={"Voice Recognition"}
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              description={
                "Effortlessly communicate with the AI using your spoken words."
              }
            />
            <Card
              heading={"Support all models"}
              icon={<Icon as={FcSupport} w={10} h={10} />}
              description={
                "Add your chatGPT api-key, then choose whatever model you want!"
              }
            />
            <Card
              heading={"Intelligent Responses"}
              icon={<Icon as={FcIdea} w={10} h={10} />}
              description={
                "Receive intelligent and context-aware responses to your inquiries."
              }
            />
            <Card
              heading={"Custom voices"}
              icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
              description={"Receive your answers with the voice you like!"}
            />
            <Card
              heading={"Efficiency and Convenience"}
              icon={<Icon as={FcApproval} w={10} h={10} />}
              description={
                "Save time and effort by speaking rather than typing for various tasks."
              }
            />
          </Flex>
        </Container>
      </ScrollAnimation>
    </Box>
  );
}
