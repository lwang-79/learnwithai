import { Badge } from "@/models";
import { 
  Button, 
  Card, 
  FormControl, 
  FormLabel, 
  HStack, 
  IconButton, 
  Image as CImage, 
  Input, 
  Select, 
  Spacer, 
  Switch, 
  Tag, 
  TagCloseButton, 
  TagLabel, 
  Text, 
  useBoolean, 
  useToast, 
  VStack 
} from "@chakra-ui/react"
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

function BadgePanel() {
  const initFormState = {
    name: '',
    startDate: new Date().toLocaleDateString('sv-SE').slice(0, 10),
    endDate: new Date().toLocaleDateString('sv-SE').slice(0, 10),
    criteriaName: 'mathCorrect',
    criteriaValue: 0,
    description: '',
    image: '',
    isVisible: false
  };

  const [ formState, setFormState ] = useState(initFormState);
  const [ criteria, setCriteria ] = useState<string[]>([]);
  const [ badges, setBadges ] = useState<Badge[]>([]);
  const [ shouldRefresh, setShouldRefresh ] = useBoolean(false);

  const toast = useToast();

  useEffect(() => {
    DataStore.query(Badge).then(badges => {
      setBadges(badges.sort((a, b) => a.startDate > b.startDate ? -1 : 1));
    });
  
  },[shouldRefresh]);

  const setInput = (key: string) => (event: any) => {
    let value = event.target.value;
    if (key === 'isVisible') {
      value = event.target.checked;
    }

    if (key === 'criteriaValue') {
      value = Number(value);
    }

    setFormState({ 
      ...formState, 
      [key]: value
    });
  }

  const addCriteriaButtonClickedHandler = () => {
    if (formState.criteriaValue === 0) {
      toast({
        description: `Criteria value must be greater than 0.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    for (const c of criteria){
      if (c.includes(formState.criteriaName)) {
        toast({
          description: `Criteria is duplicated`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
        return;
      }
    }

    setCriteria([...criteria, `${formState.criteriaName}::${formState.criteriaValue}`]);
  }

  const removeCriteriaButtonClickedHandler = (index: number) => {
    const updatedCriteria = [...criteria];
    setCriteria(updatedCriteria.filter((_, i) => i !== index));
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

  const addBadgeClickedHandler = async () => {
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

    if (formState.image === '') {
      toast({
        description: `Image is required.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (criteria.length === 0) {
      toast({
        description: `Criteria is required.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    if (formState.description === '') {
      toast({
        description: `Description is required.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    await DataStore.save(new Badge({
      name: formState.name,
      startDate: formState.startDate,
      endDate: formState.endDate,
      criteria: criteria.join('||'),
      description: formState.description,
      image: formState.image,
      isVisible: formState.isVisible
    }));

    toast({
      description: `New badge added.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setShouldRefresh.toggle();
    setFormState(initFormState);
  }

  const toggleVisibility = async (index: number) => {
    await DataStore.save(Badge.copyOf(badges[index], badge => {
      badge.isVisible = !badge.isVisible;
    }));

    setShouldRefresh.toggle();
  }

  return (
    <VStack w='full' spacing={4}>
      <Card w='full'>
        <VStack px={4} py={4}>
          <HStack w='full'>
            <VStack w='full'>
              <HStack w='full'>
                <FormControl maxW='175px'>
                  <Input
                    placeholder='Name'
                    value={formState.name}
                    onChange={setInput('name')}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder='Description'
                    value={formState.description}
                    onChange={setInput('description')}
                  />
                </FormControl>
              </HStack>
              <HStack w='full'>
                
                <FormControl minW='170px'>
                  <Select 
                    value={formState.criteriaName} 
                    onChange={setInput('criteriaName')} 
                  >
                    <option value='mathCorrect'>Math Correct</option>
                    <option value='mathExam'>Math Exam</option>
                    <option value='writing'>Writing</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <Input 
                    type='number' 
                    placeholder='Criteria Value'
                    min={0} step={1} 
                    value={formState.criteriaValue.toString()} 
                    onChange={setInput('criteriaValue')} 
                  />
                </FormControl>

                <IconButton
                  size='sm'
                  variant='ghost'
                  aria-label='add criteria'
                  icon={<MdAddCircleOutline size='24px'/>}
                  onClick={addCriteriaButtonClickedHandler}
                />
                <FormControl>
                  <Input 
                    type="date" 
                    value={formState.startDate}
                    onChange={setInput('startDate')}
                  />
                </FormControl>
                <FormControl>
                  <Input 
                    type="date" 
                    value={formState.endDate}
                    onChange={setInput('endDate')}
                  />
                </FormControl>
                <FormControl display='flex' alignItems='center' ps={4}>
                  <FormLabel mb={0}>Visible</FormLabel>  
                  <Switch onChange={setInput('isVisible')} colorScheme='teal' isChecked={formState.isVisible} />
                </FormControl>

              </HStack>
              
            </VStack>
  
            <CImage 
              src={formState.image}
              fallbackSrc='https://dummyimage.com/80&text=Image'
              alt='badge image'
              boxSize='80px'
              rounded='xl'
              onClick={uploadImageClickedHandler}
              sx={{ cursor: 'pointer' }}
            />
          </HStack>
          <HStack w='full'>
            {criteria.length === 0 && <Text ms={4}>{`Click button to add criteria   ☝️`}</Text>}
            {criteria.map((c, index) => (
              <Tag
                key={`${c}_${index}`}
                rounded='full'
              >
                <TagLabel>{c}</TagLabel>
                <TagCloseButton onClick={() => removeCriteriaButtonClickedHandler(index)}/>
              </Tag>
            ))}

            <Spacer />

            <Button 
              w='50%'
              variant='ghost'
              onClick={addBadgeClickedHandler}
            >
              Add Badge
            </Button>
          </HStack>
          
        </VStack>
      </Card>

      <VStack w='full'>
        {badges.map((badge, index) => (
          <Card 
            key={badge.id}
            w='full'
            p={4}
          >
            <HStack w='full'>
              <CImage 
                src={badge.image}
                fallbackSrc='https://dummyimage.com/80&text=Image'
                alt='badge image'
                boxSize='50px'
                rounded='xl'
              />
              <VStack w='full' align='flex-start'>
                <HStack w='full'>
                  <Text>{badge.name},</Text>
                  <Text>{badge.startDate} ~ {badge.endDate},</Text>
                  <Text>{badge.criteria},</Text>
                  <Spacer />
                  <FormControl display='flex' alignItems='center' maxW='175px'>
                    <FormLabel mb={0}>Visible</FormLabel>  
                    <Switch 
                      isChecked={badge.isVisible} 
                      colorScheme='teal'
                      onChange={()=>toggleVisibility(index)}
                    />
                  </FormControl>
                </HStack>
                <Text 
                  fontSize='xs'
                >
                  {badge.description}
                </Text>
              </VStack>
            </HStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  )
}

export default BadgePanel
