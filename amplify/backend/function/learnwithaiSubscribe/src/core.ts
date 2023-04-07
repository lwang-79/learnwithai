import { getUserMembershipById, getUserMembershipsByPayerId, updateUserMembership, UserMembership } from "./graphql";
import { cancelSubscription, getAccessToken, getPlan, getSubscription } from "./paypal";
import { Quota } from "./quota";

async function createSubscription(subscriptionId: string, userId: string) {
  const duplicatedMessage = 'Subscribed successfully. Please note you have another higher level plan subscription.';

  const token = await getAccessToken();

  const subscription = await getSubscription(subscriptionId, token);

  const plan = await getPlan(subscription.plan_id, token);

  const planName = plan.name.split(' ')[0] as string;

  const userMembership = await getUserMembershipById(userId);
  let { membership, quota } = userMembership;

  let body = 'Subscribed successfully. Plan has been upgraded.';

  switch (planName) {
    case 'Personal':
      membership.paypalSubscriptions.personal.splice(0, 0, subscriptionId);
      if (membership.paypalSubscriptions.personal.length > 5) {
        membership.paypalSubscriptions.personal = membership.paypalSubscriptions.personal.slice(0, 5);
      }
      if (membership.current > 2) {
        body = duplicatedMessage
        break;
      }
      membership.previous = membership.current;
      membership.current = 2;
      quota = Quota.personal;
      break;
    case 'Professional':
      membership.paypalSubscriptions.professional.splice(0, 0, subscriptionId);
      if (membership.paypalSubscriptions.professional.length > 5) {
        membership.paypalSubscriptions.professional = membership.paypalSubscriptions.professional.slice(0, 5);
      }
      if (membership.current > 3) {
        body = duplicatedMessage
        break;
      }
      membership.previous = membership.current;
      membership.current = 3;
      quota = Quota.professional;
      if (membership.previous == 2) {
        await cancelSubscription(membership.paypalSubscriptions.personal[0], token);
      }
      break;
    case 'Enterprise':
      membership.paypalSubscriptions.enterprise.splice(0, 0, subscriptionId);
      if (membership.paypalSubscriptions.enterprise.length > 5) {
        membership.paypalSubscriptions.enterprise = membership.paypalSubscriptions.enterprise.slice(0, 5);
      }
      if (membership.current > 4) {
        body = duplicatedMessage
        break;
      }
      membership.previous = membership.current;
      membership.current = 4;
      quota = Quota.enterprise;
      if (membership.previous == 3) {
        await cancelSubscription(membership.paypalSubscriptions.professional[0], token);
      }
      if (membership.previous == 2) {
        await cancelSubscription(membership.paypalSubscriptions.personal[0], token);
      }
      break;
    default:
  }

  await updateUserMembership({
    ...userMembership,
    membership: membership, 
    quota: quota,
    payerId: subscription.subscriber.payer_id
  });

  return {
    statusCode: 200,
    body: body
  }
}

async function unsubscribePlanFromWebhook(subscriptionId: string, payerId: string) {
  const response = await getUserMembershipsByPayerId(payerId);

  if (response.statusCode != 200) {
    console.error(response);
    return { 
      statusCode: response.statusCode,
      body: response.body as string
    };
  }

  const userMemberships = response.body as UserMembership[];

  if (userMemberships.length == 0) {
    console.log('The payerId is not found');
    return { statusCode: 200, body: 'The payerId is not found'};
  }

  let userMembership: UserMembership;

  for(const userM of userMemberships) {
    const stringOfUserM = JSON.stringify(userM);
    if (stringOfUserM.includes(subscriptionId)) {
      userMembership = userM;
    }
  }

  if (!userMembership) {
    console.log('The subscription is not found');
    return { statusCode: 200, body: 'The subscription is not found'};
  }

  let { paypalSubscriptions } = userMembership.membership;
  let { membership, quota } = userMembership;

  // set default value
  membership.current = 1;
  quota = Quota.free;

  for (const plan of ['enterprise', 'professional', 'personal']) {
    if (paypalSubscriptions[plan][0] == subscriptionId) {
      membership.previous = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
    }
  };

  // if exist other active subscription, set current plan value
  for (const plan of ['enterprise', 'professional', 'personal']) {
    if (
      paypalSubscriptions[plan][0] &&
      paypalSubscriptions[plan][0] != subscriptionId
    ) {
      const token = await getAccessToken();
      const subscription = await getSubscription(paypalSubscriptions[plan][0], token);
      if (subscription.status == 'ACTIVE') {
        quota = Quota[plan];
        membership.current = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
        break;
      }
    }
  }

  await updateUserMembership({
    ...userMembership,
    membership: membership, 
    quota: quota,
  });

  return {
    statusCode: 200,
    body: 'Success'
  }
}

async function unsubscribePlanFromGraphQL(subscriptionId: string, userId: string) {
  let body = 'Unsubscribed successfully.';

  const token = await getAccessToken();

  await cancelSubscription(subscriptionId, token);

  const userMembership = await getUserMembershipById(userId);

  if (!userMembership) {
    console.log('The user is not found');
    return { statusCode: 404, body: 'The user is not found'};
  }

  let { paypalSubscriptions } = userMembership.membership;
  let { membership, quota } = userMembership;

  // set default value
  membership.current = 1;
  quota = Quota.free;

  for (const plan of ['enterprise', 'professional', 'personal']) {
    if (paypalSubscriptions[plan][0] == subscriptionId) {
      membership.previous = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
    }
  };

  // if exist other active subscription, set current plan value
  for (const plan of ['enterprise', 'professional', 'personal']) {
    if (
      paypalSubscriptions[plan][0] &&
      paypalSubscriptions[plan][0] != subscriptionId
    ) {
      const subscription = await getSubscription(paypalSubscriptions[plan][0], token);
      if (subscription.status == 'ACTIVE') {
        quota = Quota[plan];
        membership.current = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
        break;
      }
    }
  }

  await updateUserMembership({
    ...userMembership,
    membership: membership, 
    quota: quota,
  });

  return {
    statusCode: 200,
    body: body
  }
}


async function getPlanSubscriptions(userId: string) {
  const userMembership = await getUserMembershipById(userId);
  let { paypalSubscriptions } = userMembership.membership;

  const token = await getAccessToken();

  let subscriptions = {
    personal: { id: '', plan_name: '', create_time: '', status: '' },
    professional: { id: '', plan_name: '', create_time: '', status: '' },
    enterprise: { id: '', plan_name: '', create_time: '', status: '' }
  };

  for (const plan of ['enterprise', 'professional', 'personal']) {
    if (!paypalSubscriptions[plan][0]) continue;

    const subscription = await getSubscription(paypalSubscriptions[plan][0], token);

    subscriptions[plan] = {
      id: subscription.id,
      plan_name: plan,
      create_time: subscription.create_time,
      status: subscription.status
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(subscriptions)
  }
}

async function updateMembershipLevel(userId: string, level: number) {
  const userMembership = await getUserMembershipById(userId);

  await updateUserMembership({
    ...userMembership,
    membership: {
      ...userMembership.membership,
      current: level,
      previous: userMembership.membership.current
    }
  });

  return {
    statusCode: 200,
    body: 'Success'
  }
}
export {
  createSubscription,
  getPlanSubscriptions,
  unsubscribePlanFromGraphQL,
  unsubscribePlanFromWebhook,
  updateMembershipLevel
}