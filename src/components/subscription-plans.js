import {
  Box,
  VStack,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

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

export default function SubscriptionPlans({
  plans,
  subscription,
  manage,
  cancel,
}) {
  const middleIndex = plans.findIndex(
    (plan) => subscription?.subscription_plan_id === plan?.id
  );

  if (middleIndex > -1) {
    const middlePlan = plans.splice(middleIndex, 1)[0];
    plans.splice(Math.floor(plans.length / 2), 0, middlePlan);
  }

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      textAlign="center"
      justify="center"
      align="center"
      spacing={{ base: 2, lg: 5 }}
      py={{ base: 16, md: 24, lg: 32 }}
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
                $ {plan.monthlyPrice}
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
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
            {subscription?.subscription_plan_id === plan?.id ? (
              <Stack spacing={4} w="80%" pt={7}>
                <Button
                  onClick={manage}
                  w="full"
                  colorScheme="red"
                  variant={"solid"}
                >
                  Manage billing
                </Button>
                <Button
                  onClick={cancel}
                  w="full"
                  colorScheme="red"
                  variant={"outline"}
                >
                  Cancel plan
                </Button>
              </Stack>
            ) : (
              <>
                <Box w="80%" pt={7}>
                  <Button
                    isDisabled
                    w="full"
                    colorScheme="red"
                    variant={
                      subscription?.subscription_plan_id === plan?.id
                        ? "solid"
                        : "outline"
                    }
                  >
                    Subscribe
                  </Button>
                </Box>
              </>
            )}
          </VStack>
        </PriceWrapper>
      ))}
    </Stack>
  );
}
