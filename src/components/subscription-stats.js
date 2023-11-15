import { Flex, Box, Heading, Badge } from "@chakra-ui/react";

export default function SubscriptionStats({ plans, subscription }) {
  return (
    <Flex mt="5vh" p={4} borderBottom="1px solid gray" justify={"space-around"}>
      <Box textAlign={"center"}>
        <Heading size="lg">Plan</Heading>
        <Badge fontSize="md" mt="10px">
          {plans.map((plan) => {
            if (plan.id === subscription?.subscription_plan_id) {
              return plan.name;
            }
          })}
        </Badge>
      </Box>
      <Box textAlign={"center"}>
        <Heading size="lg">Question Hours</Heading>
        <Badge fontSize="lg" mt="10px">
          {subscription?.hours?.question.toFixed(2)}h
        </Badge>
      </Box>
      <Box textAlign={"center"}>
        <Heading size="lg">Answer Hours</Heading>
        <Badge fontSize="lg" mt="10px">
          {subscription?.hours?.answer.toFixed(2)}h
        </Badge>
      </Box>
      <Box textAlign={"center"}>
        <Heading size="lg">Next invoice</Heading>
        <Badge fontSize="lg" mt="10px">
          {subscription?.next_bill_date}
        </Badge>
      </Box>
    </Flex>
  );
}
