import { Essay } from "@/models"
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import EssayItem from "./EssayItem";
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
  useColorModeValue, 
  Divider
} from "@chakra-ui/react";
import { MdMenu, MdNavigateBefore, MdNavigateNext, MdRefresh } from "react-icons/md";

interface EssayListProps {
  selectCallback: (essay: Essay) => void
  title: string
  defaultPageStep: number
  refreshTrigger: boolean
}

function EssayList({ selectCallback, title, defaultPageStep, refreshTrigger }: EssayListProps) {
  const [ pageStep, setPageStep ] = useState(defaultPageStep);
  const [ essays, setEssays ] = useState<Essay[]>();
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ isLastPage, setIsLastPage ] = useState(false);
  const bgColor = useColorModeValue('teal.100', 'teal.800');

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

  const refreshList = useCallback((page: number = currentPage, limit: number = pageStep) => {
    DataStore.query(Essay, Predicates.ALL, {
      sort: e => e.DateTime(SortDirection.DESCENDING),
      page: page,
      limit: limit
    }).then(essays => {
      if (essays.length > 0) {
        setEssays(essays);
      } else {
        if (page > 0) {
          setCurrentPage(page - 1);
          setIsLastPage(true);
          refreshList(page - 1, limit);
        }
      }
    });
  },[currentPage, pageStep])

  useEffect(() => {
    refreshList();
  }, [refreshList, refreshTrigger]);


  return (
    <>
      {essays && essays.length > 0 &&
        <>
          <Divider />
          <VStack w='full'>
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
            {essays &&
              essays.map((essay, index) => {
                return (
                  <Box 
                    rounded='xl'
                    p={2}
                    w='full' 
                    maxW='5xl'
                    key={index}
                    cursor='pointer'
                    _hover={{bg: bgColor}}
                  >
                    <EssayItem essay={essay} refreshList={refreshList} selectCallback={selectCallback}/>
                  </Box>
                )
              })
            }
            
          </VStack>
        </>
      }
    </>
  )
}

export default EssayList