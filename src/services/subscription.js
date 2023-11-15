const Paddle = window.Paddle;

export const buyPlan = async (id, user, toast) => {
  await Paddle.Checkout.open({
    product: id,
    email: user.email,
    passthrough: JSON.stringify({ userId: user.userId }),
    successCallback: (data) => {
      toast({
        title: "Subscribed to plan!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      console.log(data);
    },
  });
};

export const managePlan = (subscription, user, toast) => {
  let { update_url } = subscription;

  Paddle.Checkout.open({
    override: update_url,
    passthrough: JSON.stringify({ userId: user.userId }),
    successCallback: () => {
      toast({
        title: "Saved successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
  });
};

export const cancelPlan = (subscription, user, toast) => {
  let { cancel_url } = subscription;

  Paddle.Checkout.open({
    override: cancel_url,
    passthrough: JSON.stringify({ userId: user.userId }),
    successCallback: () => {
      toast({
        title: "Canceled successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    },
  });
};
