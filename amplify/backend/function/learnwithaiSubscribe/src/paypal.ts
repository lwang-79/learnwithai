import fetch from "node-fetch";
import { Plan, Subscription } from "./paypal-types";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const paypalEndpoint = process.env.PAYPAL_API_ENDPOINT;
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const webhookId = process.env.PAYPAL_WEBHOOK_ID;

async function getAccessToken() {
  const { Parameter } = await new SSMClient({
    region: process.env.AWS_REGION,
  }).send(
    new GetParameterCommand({
      Name: process.env["PAYPAL_SECRET"],
      WithDecryption: true,
    }),
  );

  let url = `${paypalEndpoint}/v1/oauth2/token`;

  const authData = `${paypalClientId}:${Parameter.Value}`;
  const base64Auth = Buffer.from(authData).toString("base64");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded,
    redirect: "follow",
  });

  if (response.status != 200) {
    console.error(await response.json());
    throw new Error("Failed to get access token!");
  }

  const data: any = await response.json();

  return data.access_token as string;
}

async function getSubscription(
  subscriptionId: string,
  accessToken: string,
): Promise<Subscription> {
  let url = `${paypalEndpoint}/v1/billing/subscriptions/${subscriptionId}`;

  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.status != 200) {
    console.error(await response.json());
    throw new Error("Failed to get subscription detail!");
  }

  const subscription: Subscription = await response.json();

  return subscription;
}

async function cancelSubscription(
  subscriptionId: string,
  accessToken: string,
  reason: string = "",
) {
  let url = `${paypalEndpoint}/v1/billing/subscriptions/${subscriptionId}/cancel`;

  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ reason: reason }),
  });

  if (response.status != 204) {
    console.error(await response.json());
    throw new Error("Failed to cancel subscription!");
  }
}

async function getPlan(planId: string, accessToken: string): Promise<Plan> {
  const url = `${paypalEndpoint}/v1/billing/plans/${planId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.status != 200) {
    console.error(await response.json());
    throw new Error("Failed to get plan detail!");
  }

  const data: Plan = await response.json();

  return data;
}

async function getSubscriptionPlanName(
  subscriptionId: string,
  accessToken: string,
): Promise<string> {
  const subscription = await getSubscription(subscriptionId, accessToken);
  const plan = await getPlan(subscription.plan_id, accessToken);
  return plan.name.split(" ")[0] as string;
}

async function isWebhookVerified(event: any): Promise<boolean> {
  const url = `${paypalEndpoint}/v1/notifications/verify-webhook-signature`;

  const token = await getAccessToken();

  const body = {
    auth_algo: event.multiValueHeaders["PAYPAL-AUTH-ALGO"][0],
    cert_url: event.multiValueHeaders["PAYPAL-CERT-URL"][0],
    transmission_id: event.multiValueHeaders["PAYPAL-TRANSMISSION-ID"][0],
    transmission_sig: event.multiValueHeaders["PAYPAL-TRANSMISSION-SIG"][0],
    transmission_time: event.multiValueHeaders["PAYPAL-TRANSMISSION-TIME"][0],
    webhook_id: webhookId,
    webhook_event: JSON.parse(event.body),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (response.status != 200) {
    return false;
  }

  if (data.verification_status == "SUCCESS") {
    return true;
  }

  return false;
}

export {
  cancelSubscription,
  getAccessToken,
  getPlan,
  getSubscription,
  getSubscriptionPlanName,
  isWebhookVerified,
};
