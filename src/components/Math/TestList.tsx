import { Test } from "@/models"
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import TestItem from "./TestItem";
import { 
  Box, 
  HStack, 
  Heading, 
  Icon, 
  IconButton, 
  Menu, 
  MenuButton, 
  MenuGroup, 
  MenuItem, 
  MenuList, 
  Spacer, 
  VStack, 
  Wrap, 
  WrapItem, 
  useColorModeValue 
} from "@chakra-ui/react";
import { MdMenu, MdNavigateBefore, MdNavigateNext, MdRefresh } from "react-icons/md";

interface TestListProps {
  selectCallback: (test: Test) => void
  title: string
  defaultPageStep: number
}

function TestList({ selectCallback, title, defaultPageStep }: TestListProps) {
  const [ pageStep, setPageStep ] = useState(defaultPageStep);
  const [ tests, setTests ] = useState<Test[]>();
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ isLastPage, setIsLastPage ] = useState(false);
  const bgColor = useColorModeValue('teal.100', 'teal.800');

  useEffect(() => {
    refreshList();
  }, []);

  const changePageButtonClickedHandler = async (count: number) => {
    const page = currentPage + count;
    const tests = await DataStore.query(
      Test, 
      Predicates.ALL, {
        sort: e => e.dateTime(SortDirection.DESCENDING),
        page: page,
        limit: pageStep
      }
    );

    if (tests.length > 0) {
      setTests(tests);
      setCurrentPage(page);
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }    
  }

  const refreshList = (page: number = currentPage, limit: number = pageStep) => {
    DataStore.query(Test, Predicates.ALL, {
      sort: e => e.dateTime(SortDirection.DESCENDING),
      page: page,
      limit: limit
    }).then(tests => setTests(tests));
  }

  return (
    <>
      {tests && tests.length > 0 &&
        <VStack w='full' align='flex-start'>
          <HStack w='full'>
            <Heading size='sm'>{title}</Heading>
            <Spacer />
            <IconButton
              rounded='full'
              variant='ghost'
              aria-label='Refresh'
              icon={<Icon as={MdRefresh} boxSize={6} />}
              onClick={()=>refreshList()}
            />
            <IconButton
              rounded='full'
              variant='ghost'
              aria-label='Before'
              icon={<Icon as={MdNavigateBefore} boxSize={6} />}
              isDisabled={currentPage === 0}
              onClick={()=>changePageButtonClickedHandler(-1)}
            />
            <IconButton
              rounded='full'
              variant='ghost'
              aria-label='Before'
              icon={<Icon as={MdNavigateNext} boxSize={6} />}
              isDisabled={isLastPage}
              onClick={()=>changePageButtonClickedHandler(1)}
            />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<MdMenu />}
                rounded='full'
                variant='ghost'
              />
              <Box>
                <MenuList >
                  <MenuGroup title='Items per page'>
                  {[5, 10, 20, 50].map((count, index) => {
                    return (
                      <MenuItem
                        key={`menu-item-${index}`}
                        onClick={()=>{
                          setPageStep(count);
                          refreshList(0, count);
                          setCurrentPage(0);
                          setIsLastPage(false);
                        }}
                      >
                        {count}
                      </MenuItem>
                    )
                  })}
                  </MenuGroup>
                </MenuList>
              </Box>
            </Menu>
          </HStack>
          <Wrap>
            {tests &&
              tests.map((test, index) => {
                return (
                  <WrapItem 
                    rounded='xl'
                    p={1}
                    key={index}
                    cursor='pointer'
                    _hover={{bg: bgColor}}
                  >
                    <TestItem test={test} refreshList={refreshList} selectCallback={selectCallback}/>
                  </WrapItem>
                )
              })
            }
          </Wrap>
          
        </VStack>
      }
    </>
  )
}

export default TestList