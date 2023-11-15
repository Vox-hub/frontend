import { useState } from "react";
import { Link as Routing } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  HStack,
  Button,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import ScrollAnimation from "react-animate-on-scroll";
import { FaCheckCircle } from "react-icons/fa";
import plans from "../plans-data.json";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
  const [subscriptionType, setSubscriptionType] = useState("monthly");

  return (
    <Box mt="8vh" py={12}>
      <Tabs
        mt="5vh"
        variant="soft-rounded"
        colorScheme="red"
        align="center"
        padding="10px"
      >
        <ScrollAnimation animateIn="fadeInDown">
          <VStack mb="2.5vh" spacing={2} textAlign="center">
            <Heading as="h1" fontSize="4xl">
              Plans that fit your need
            </Heading>
            <Text fontSize="lg" color={"gray.500"}>
              Start only for ${plans[0].monthlyPrice}. Cancel at anytime.
            </Text>
          </VStack>
          <TabList>
            <Tab onClick={() => setSubscriptionType("monthly")}>Monthly</Tab>
            <Tooltip hasArrow label="Coming soon!">
              <Tab isDisabled onClick={() => setSubscriptionType("yearly")}>
                Yearly
              </Tab>
            </Tooltip>
          </TabList>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <TabPanels>
            <TabPanel>
              <Stack
                direction={{ base: "column", md: "row" }}
                textAlign="center"
                justify="center"
                align="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}
              >
                {plans.map((plan, index) => (
                  <PriceWrapper key={index}>
                    <Box py={4} px={12}>
                      <Text fontWeight="500" fontSize="2xl">
                        {plan.name}
                      </Text>
                      <HStack justifyContent="center">
                        <Text fontSize="3xl" fontWeight="600">
                          $
                        </Text>
                        <Text fontSize="5xl" fontWeight="900">
                          $
                          {subscriptionType === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice}
                        </Text>
                        <Text fontSize="3xl" color="gray.500">
                          /{subscriptionType === "monthly" ? "month" : "year"}
                        </Text>
                      </HStack>
                    </Box>
                    <VStack
                      bg={useColorModeValue("gray.50", "gray.700")}
                      py={4}
                      borderBottomRadius={"xl"}
                    >
                      <List spacing={3} textAlign="start" px={12}>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index}>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {feature}
                          </ListItem>
                        ))}
                      </List>
                      <Box w="80%" pt={7}>
                        <Button
                          as={Routing}
                          to="/signup"
                          w="full"
                          colorScheme="red"
                          variant={plan.popular ? "solid" : "outline"}
                        >
                          Subscribe
                        </Button>
                      </Box>
                    </VStack>
                  </PriceWrapper>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack
                direction={{ base: "column", md: "row" }}
                textAlign="center"
                justify="center"
                align="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}
              >
                {plans.map((plan, index) => (
                  <PriceWrapper key={index}>
                    <Box py={4} px={12}>
                      <Text fontWeight="500" fontSize="2xl">
                        {plan.name}
                      </Text>
                      <HStack justifyContent="center">
                        <Text fontSize="3xl" fontWeight="600">
                          $
                        </Text>
                        <Text fontSize="5xl" fontWeight="900">
                          $
                          {subscriptionType === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice}
                        </Text>
                        <Text fontSize="3xl" color="gray.500">
                          /{subscriptionType === "monthly" ? "month" : "year"}
                        </Text>
                      </HStack>
                      <Text as="b" color="blue.400">
                        Saved with annual billing{" "}
                        <Text as="span" color="green.400">
                          $
                          {parseInt(
                            plan.monthlyPrice * 12 - plan.yearlyPrice + 1
                          )}
                        </Text>
                      </Text>
                    </Box>
                    <VStack
                      bg={useColorModeValue("gray.50", "gray.700")}
                      py={4}
                      borderBottomRadius={"xl"}
                    >
                      <List spacing={3} textAlign="start" px={12}>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index}>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            {feature}
                          </ListItem>
                        ))}
                      </List>
                      <Box w="80%" pt={7}>
                        <Button
                          w="full"
                          colorScheme="red"
                          variant={plan.popular ? "solid" : "outline"}
                        >
                          Subscribe
                        </Button>
                      </Box>
                    </VStack>
                  </PriceWrapper>
                ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </ScrollAnimation>
      </Tabs>
    </Box>
  );
}
