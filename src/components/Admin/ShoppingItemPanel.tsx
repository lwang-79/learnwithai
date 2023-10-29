import { ShoppingItem, ShoppingItemCategory } from "@/models";
import { 
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, 
  Card, 
  FormControl, 
  HStack, 
  Icon,
  IconButton, 
  Image as CImage, 
  Input, 
  Select, 
  Spacer, 
  Text, 
  useBoolean, 
  useDisclosure, 
  useToast, 
  VStack 
} from "@chakra-ui/react"
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useRef, useState } from "react";
import { MdAddCircleOutline, MdClose } from "react-icons/md";

function ShoppingItemPanel() {
  const initFormState = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: ShoppingItemCategory.REWARD
  };

  const [ formState, setFormState ] = useState(initFormState);
  const [ items, setItems ] = useState<ShoppingItem[]>([]);
  const [ shouldRefresh, setShouldRefresh ] = useBoolean(false);
  const [ selectedItemId, setSelectedItemId ] = useState('id');

  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert
  } = useDisclosure();

  const cancelRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    DataStore.query(ShoppingItem, Predicates.ALL,
      {
        sort: i => i.createdAt(SortDirection.ASCENDING)
      }).then(items => {
        setItems(items);
      }
    );
  
  },[shouldRefresh]);

  const setInput = (key: string) => (event: any) => {
    let value;
    if (key === 'price') {
      value = parseInt(event.target.value);
    }
    else { 
      value = event.target.value;
    }

    setFormState({ 
      ...formState, 
      [key]: value
    });
  }

  const addItemClickedHandler = async () => {
    if (formState.name === '') {
      toast({
        description: `Name is required.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (formState.description.length < 10) {
      toast({
        description: `Description is too shot.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (formState.price < 10) {
      toast({
        description: `Price must >= 10.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (!formState.image) {
      toast({
        description: `Please upload an image for the item.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    console.log(formState)

    await DataStore.save(new ShoppingItem({
      name: formState.name,
      description: formState.description,
      price: formState.price,
      image: formState.image,
      category: formState.category
    }));

    toast({
      description: `New shopping item added.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setShouldRefresh.toggle();
    setFormState(initFormState);
  }

  const deleteItemClickedHandler = async () => {
    onCloseAlert();
    const toDelete = await DataStore.query(ShoppingItem, selectedItemId);

    if (!toDelete) { return; }

    await DataStore.delete(toDelete);
    setShouldRefresh.toggle();

    toast({
      description: `Shopping item deleted.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  const uploadImageClickedHandler = () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.png';

      const canvas = document.createElement('canvas');
  
      input.addEventListener("change", async () => {
        if (input.files){
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
              const ctx = canvas.getContext('2d');

              const maxWidth = 150;
              const maxHeight = 150;
              let width = img.width;
              let height = img.height;
              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight
                }
              }

              canvas.width = width;
              canvas.height = height;

              ctx?.drawImage(img, 0, 0, width, height);

              const dataURL = canvas.toDataURL('image/png');
              setFormState({ ...formState, image: dataURL });
            }
            const result = e.target?.result as string;
            img.src = result;
          }

          reader.readAsDataURL(input.files[0]);
        }
      }, false)  
  
      input.click();
  
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <VStack w='full' spacing={4}>
      <Card w='full'>
        <VStack px={4} py={4}>
          <HStack w='full'>
            <CImage 
              src={formState.image}
              fallbackSrc='https://dummyimage.com/80&text=Image'
              alt='badge image'
              boxSize='80px'
              rounded='xl'
              onClick={uploadImageClickedHandler}
              sx={{ cursor: 'pointer' }}
            />
            <VStack w='full'>
              <HStack w='full'>
                <FormControl>
                  <Input
                    placeholder='Name'
                    value={formState.name}
                    onChange={setInput('name')}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder='Price'
                    value={formState.price}
                    type='number'
                    onChange={setInput('price')}
                  />
                </FormControl>
                <FormControl>
                  <Select
                    value={formState.category} 
                    onChange={setInput('category')}
                  >
                    {Object.values(ShoppingItemCategory).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Select>
                </FormControl>

              </HStack>
              <HStack w='full'>
                <FormControl>
                  <Input
                    placeholder='Description'
                    value={formState.description}
                    onChange={setInput('description')}
                  />
                </FormControl>
              </HStack>
            </VStack>
  
            <IconButton
              aria-label='Add Item'
              variant='ghost'
              icon={<Icon as={MdAddCircleOutline} boxSize={8} />}
              onClick={addItemClickedHandler}
            />
          </HStack>
          
        </VStack>
      </Card>

      <VStack w='full'>
        {items.map((item, index) => (
          <Card 
            key={`${item.id}-${index}`}
            w='full'
            p={4}
          >
            <HStack w='full'>
              <CImage 
                src={item.image??''}
                fallbackSrc='https://dummyimage.com/80&text=Image'
                alt='badge image'
                boxSize='50px'
                rounded='xl'
              />
              <VStack w='full' align='flex-start'>
                <HStack w='full' spacing={8}>
                  <Text>{`Name: ${item.name}`}</Text>
                  <Spacer />
                  <Text>{`Price: ${item.price}`}</Text>
                  <Text>{`Category: ${item.category}`}</Text>
                </HStack>
                <Text>{item.description}</Text>
              </VStack>
              <IconButton
                aria-label='Add Message'
                variant='ghost'
                icon={<Icon as={MdClose} boxSize={8} />}
                onClick={()=>{
                  setSelectedItemId(item.id);
                  onOpenAlert();
                }}
              />
            </HStack>
          </Card>
        ))}
      </VStack>

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete shopping item?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef} 
                onClick={onCloseAlert}
                rounded={'full'}
                px={6}
              >
                Cancel
              </Button>
              <Button 
                colorScheme='red' 
                rounded={'full'}
                px={6}
                onClick={deleteItemClickedHandler} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  )
}

export default ShoppingItemPanel
