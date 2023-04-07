import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useToast } from "@chakra-ui/react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";
import { LearnwithaiSubscribeMutation } from "@/types/API";
import { learnwithaiSubscribe } from "@/graphql/mutations";

interface PayPalButtonWrapperProps {
  type: string,
  planId: string,
  userId: string,
  onFinished: () => void
}

const PayPalButtonWrapper = ({ type, planId, userId, onFinished }: PayPalButtonWrapperProps) => {
	// const [{ options }, dispatch] = usePayPalScriptReducer();
  const toast = useToast();

	// useEffect(() => {
  //   dispatch({
  //     type: "resetOptions",
  //     value: {
  //       ...options,
  //       intent: "subscription",
  //     },
  //   });
  // }, [type]);

  const updateUserMembership = async (subscriptionId: string) => {
    const response = await API.graphql(graphqlOperation(
      learnwithaiSubscribe,
      { operation: 'create', userId: userId, subscriptionId: subscriptionId }
    )) as GraphQLResult<LearnwithaiSubscribeMutation>;

    if (response.data?.learnwithaiSubscribe?.statusCode == 200) {
      let status: "error" | "loading" | "info" | "warning" | "success" | undefined = 'success'
      
      if (response.data.learnwithaiSubscribe.body?.includes('another')) {
        status = 'warning'
      } 

      toast({
        description: `${response.data.learnwithaiSubscribe.body} You can manage your subscription from the profile or Paypal console.`,
        status: status,
        duration: 30000,
        isClosable: true
      });

      onFinished();

    } else {
      console.error(response.data?.learnwithaiSubscribe?.body);

      onFinished();

      toast({
        description: `Something wrong, please try again later. You can manage your subscription from the profile or Paypal console.`,
        status: 'error',
        duration: 30000,
        isClosable: true
      });
    }    
  }

	return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: planId,
          })
          .then(async (orderId) => {
            console.log(orderId)
            return orderId;
          });
      }}
      onApprove={async (data, actions) => {
        if (data.subscriptionID){
          await updateUserMembership(data.subscriptionID);
        }
      }}
      style={{
        label: "subscribe",
        shape: 'pill',
      }}
    />
  );
}

export default PayPalButtonWrapper