import { useContext, useEffect, useState } from "react";
import { Link as Routing } from "react-router-dom";
import API from "../api";
import UserContext from "../context/userContext";
import { managePlan, cancelPlan } from "../services/subscription";
import Loading from "../components/loading";
import SubscriptionStats from "../components/subscription-stats";
import SubscriptionPlans from "../components/subscription-plans";
import plans from "../plans-data.json";
import {
  Flex,
  Heading,
  Button,
  useToast,
  Spinner,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";

export default function Subscription() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState({});
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/user/${user?.userId}`);

        setLoading(false);
        setSubscription(response.data.subscription);
      } catch {
        toast({
          title: "Failed fetching data",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {subscription ? (
        <>
          <SubscriptionStats plans={plans} subscription={subscription} />
          <SubscriptionPlans
            plans={plans}
            subscription={subscription}
            manage={() => managePlan(subscription, user, toast)}
            cancel={() => cancelPlan(subscription, user, toast)}
          />
        </>
      ) : (
        <Flex
          textAlign={"center"}
          h="100vh"
          direction="column"
          justify="center"
          align="center"
        >
          <VStack spacing={4}>
            <Heading>
              <AiFillLock />
            </Heading>
            <Heading size="md">
              You can't access to this page, you need to <br /> be subscribed to
              a plane!
            </Heading>
            <Routing to="/pricing">
              <Button colorScheme="red">Go pricing</Button>
            </Routing>
          </VStack>
        </Flex>
      )}
    </>
  );
}
