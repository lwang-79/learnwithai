import ShoppingItemCard from "@/components/Store/ShoppingItemCard";
import { ShoppingItem } from "@/models"
import { Wrap, WrapItem } from "@chakra-ui/react";

function StorePanel({ items }: { items: ShoppingItem[]}) {
  return (
    <Wrap justify='center' spacing={4}>
      {items.map(item => (
        <WrapItem key={item.id}>
          <ShoppingItemCard item={item} />
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default StorePanel
