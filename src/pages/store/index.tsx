import Layout from "@/components/Common/Layout"
import SharedComponents from "@/components/Common/SharedComponents";
import StorePanel from "@/components/Store/StorePanel";
import { ShoppingItem, ShoppingItemCategory } from "@/models";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tag, VStack } from "@chakra-ui/react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function Store() {
  const [ rewards, setRewards ] = useState<ShoppingItem[]>([]);
  const [ storeItems, setStoreItems ] = useState<ShoppingItem[]>([]);
  const { dataStoreUser } = useContext(SharedComponents);
  const router = useRouter();

  useEffect(() => {
    if (!dataStoreUser) return;

    if (dataStoreUser.membership!.current < 2) {
      router.replace('/');
      return;
    }

    DataStore.query(ShoppingItem, Predicates.ALL,
      {
        sort: i => i.price(SortDirection.ASCENDING)
      }).then(items => {
        const rewards = items.filter(i => i.category === ShoppingItemCategory.REWARD);
        setRewards(rewards);
        const others = items.filter(i => i.category !== ShoppingItemCategory.REWARD);
        setStoreItems(others);
      }
    );
  },[dataStoreUser, router]);

  return (
    <Layout>
      <Tabs isFitted w='full' colorScheme='teal'>
        <TabList>
          <Tab>Rewards</Tab>
          <Tab>Store</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <Tag colorScheme='orange'>Redeem coins and notify your guardians. They will decide whether to purchase the reward for you. </Tag>
              <StorePanel items={rewards} />
            </VStack>
          </TabPanel>
          <TabPanel>
          <StorePanel items={storeItems} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default Store
