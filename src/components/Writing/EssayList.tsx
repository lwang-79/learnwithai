import { Essay } from "@/models"
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import EssayItem from "./EssayItem";
import { Box, Button, HStack, Heading, Icon, Spacer, VStack, useColorModeValue } from "@chakra-ui/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface EssayListProps {
  selectCallback: (essay: Essay) => void
  title: string
  defaultPageStep: number
}

// const pageStep = 3;
function EssayList({ selectCallback, title, defaultPageStep }: EssayListProps) {
  const [ pageStep, setPageStep ] = useState(defaultPageStep);
  const [ essays, setEssays ] = useState<Essay[]>();
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ isLastPage, setIsLastPage ] = useState(false);
  const bgColor = useColorModeValue('teal.100', 'teal.800');

  useEffect(() => {
    // const essaysSub = DataStore
    // .observeQuery(Essay, Predicates.ALL, {
    //   sort: e => e.DateTime(SortDirection.DESCENDING),
    // })
    // .subscribe(({ items }) => {
    //   setEssays(items);
    // });

    // return () => essaysSub.unsubscribe();

    DataStore.query(Essay, Predicates.ALL, {
      sort: e => e.DateTime(SortDirection.DESCENDING),
      page: currentPage,
      limit: pageStep
    }).then(essays => setEssays(essays));

  }, []);

  const changePageButtonClickedHandler = async (count: number) => {
    const page = currentPage + count;
    const essays = await DataStore.query(
      Essay, 
      Predicates.ALL, {
        sort: e => e.DateTime(SortDirection.DESCENDING),
        page: page,
        limit: pageStep
      }
    );

    if (essays.length > 0) {
      setEssays(essays);
      setCurrentPage(page);
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }    
  }

  return (
    <VStack w='full'>
                  
      <HStack w='full'>
        <Heading size='sm'>Recent Essays</Heading>
        <Spacer />
        <Button
          size='sm'
          variant='ghost'
          isDisabled={currentPage === 0}
          onClick={()=>changePageButtonClickedHandler(-1)}
        >
          <Icon as={MdNavigateBefore} boxSize='6' />
          {/* Previous page */}
        </Button>
        <Button
          size='sm'
          variant='ghost'
          isDisabled={isLastPage}
          onClick={()=>changePageButtonClickedHandler(1)}
        >
          <Icon as={MdNavigateNext} boxSize='6' />
          {/* Next page */}
        </Button>
      </HStack>
      {essays &&
        essays.map((essay, index) => {
          return (
            <Box 
              rounded='xl'
              p={2}
              w='full' 
              key={index}
              cursor='pointer'
              _hover={{bg: bgColor}}
              onClick={()=>selectCallback(essay)}
            >
              <EssayItem essay={essay}/>
            </Box>
          )
        })
      }
      
    </VStack>
  )
}

export default EssayList