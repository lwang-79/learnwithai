import Layout from "@/components/Common/Layout"
import ShoppingItemCard from "@/components/Store/ShoppingItemCard";
import { ShoppingItem } from "@/models"
import { Wrap, WrapItem } from "@chakra-ui/react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";

function Store() {
  const [ items, setItems ] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    DataStore.query(ShoppingItem, Predicates.ALL,
      {
        sort: i => i.price(SortDirection.ASCENDING)
      }).then(items => {

        setItems(items);
      }
    );
  },[]);

  return (
    <Layout>
      <Wrap justify='center' spacing={4}>
        {items.map(item => (
          <WrapItem key={item.id}>
            <ShoppingItemCard item={item} />
          </WrapItem>
        ))}
      </Wrap>
      
    </Layout>
  )
}

export default Store
