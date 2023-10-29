import { ShoppingItem, User } from "@/models"
import { DataStore } from "aws-amplify";
import { SEEDS } from "./game";
import { sesSendEmail } from "./utils";

const redeemReward = async (
  user: User,
  reward: ShoppingItem
) => {
  if (
    user && 
    user.notification && 
    user.notification.emails.length > 0
  ) {
    const message = `${user.username} redeemed a reward cost ${reward.price} coins.
Name: ${reward.name}
Description: ${reward.description}
    `;

    await sesSendEmail(
      user.notification.emails as string[], 
      `${process.env.NEXT_PUBLIC_APP_NAME} redeem notification`, 
      message, 
      'notification@StudyWithAI.pro'
    );
  } else {
    console.log('no email');
    throw new Error(`Please configure notification in your profile first.`);
  }
    
  const updatedUser = await DataStore.save(User.copyOf(user, updated => {
    updated.gameData!.coins = user.gameData!.coins! - reward.price
  }));

  return updatedUser;
}

const redeemSeed = async (
  user: User,
  seed: ShoppingItem
) => {
  let randomSeed:string;

  if (
    user && 
    user.gameData
  ) {
    let random = Math.random();
    let randomIndex;

    if (random <= seed.price / 1000) {
      const midpoint = Math.floor(SEEDS.length / 2);
      randomIndex = Math.floor(Math.random() * (SEEDS.length - midpoint)) + midpoint;
    } else {
      const midpoint = Math.floor(SEEDS.length / 2);
      randomIndex = Math.floor(Math.random() * midpoint);
    }

    randomSeed = SEEDS[randomIndex];
  } else {
    console.log('no game data');
    throw new Error(`You haven't planted any plants. Plant a seed first.`);
  }
    
  const updatedUser = await DataStore.save(User.copyOf(user, updated => {
    updated.gameData!.startDate = new Date().toLocaleString('sv-SE').slice(0, 10);
    updated.gameData!.seed = randomSeed;
    updated.gameData!.level = 0;
    updated.gameData!.coins = user.gameData!.coins! - seed.price
  }));

  return updatedUser;
}

export {
  redeemReward,
  redeemSeed
}