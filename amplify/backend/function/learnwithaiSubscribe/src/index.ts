import { isWebhookVerified } from "./paypal";
import {
  createSubscription,
  getPlanSubscriptions,
  unsubscribePlanFromGraphQL,
  unsubscribePlanFromWebhook,
  updateMembershipLevel,
} from "./core";

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let statusCode = 200;
  let body = "Success";

  if (event.multiValueHeaders && event.multiValueHeaders["PAYPAL-AUTH-ALGO"]) {
    ({ statusCode, body } = await handlePaypalWebhook(event));
  } else {
    ({ statusCode, body } = await handleGraphQL(event));
  }

  return {
    statusCode: statusCode,
    body: body,
  };
};

async function handlePaypalWebhook(event: any) {
  if (!(await isWebhookVerified(event))) {
    return { statusCode: 400 };
  }

  let statusCode = 200;
  let body = "Success";
  const eventBody = JSON.parse(event.body);
  console.log(eventBody);

  switch (eventBody.event_type) {
    case "BILLING.SUBSCRIPTION.CANCELLED":
      if (!eventBody.resource.id || !eventBody.resource.subscriber.payer_id)
        return { statusCode: 200 };

      ({ statusCode, body } = await unsubscribePlanFromWebhook(
        eventBody.resource.id,
        eventBody.resource.subscriber.payer_id,
      ));
      break;

    default:
  }

  return {
    statusCode: statusCode,
    body: body,
  };
}

async function handleGraphQL(event: any) {
  let statusCode = 200;
  let body = "Success";

  switch (event.arguments.operation) {
    case "create":
      ({ statusCode, body } = await createSubscription(
        event.arguments.subscriptionId,
        event.arguments.userId,
      ));
      break;

    case "cancel":
      ({ statusCode, body } = await unsubscribePlanFromGraphQL(
        event.arguments.subscriptionId,
        event.arguments.userId,
      ));
      break;

    case "getPlanSubscriptions":
      ({ statusCode, body } = await getPlanSubscriptions(
        event.arguments.userId,
      ));
      break;

    case "setToFreePlan":
      ({ statusCode, body } = await updateMembershipLevel(
        event.arguments.userId,
        1,
      ));
    default:
  }

  return {
    statusCode: statusCode,
    body: body,
  };
}
