import { LocalQuestionSet, Test } from "@/models";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
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
  useColorModeValue,
  Divider,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdMenu,
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineArticle,
  MdRefresh,
} from "react-icons/md";
import Result from "./Result";

interface TestListProps {
  selectCallback: (test: Test) => void;
  title: string;
  defaultPageStep: number;
  refreshTrigger: boolean;
}

function TestList({
  selectCallback,
  title,
  defaultPageStep,
  refreshTrigger,
}: TestListProps) {
  const [pageStep, setPageStep] = useState(defaultPageStep);
  const [tests, setTests] = useState<Test[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const bgColor = useColorModeValue("teal.100", "teal.800");
  const [questionSets, setQuestionSets] = useState<LocalQuestionSet[]>([]);

  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onClose: onCloseResultModal,
  } = useDisclosure();

  const changePageButtonClickedHandler = async (count: number) => {
    const page = currentPage + count;
    const tests = await DataStore.query(Test, Predicates.ALL, {
      sort: (e) => e.dateTime(SortDirection.DESCENDING),
      page: page,
      limit: pageStep,
    });

    if (tests.length > 0) {
      let questionSets: LocalQuestionSet[] = [];
      for (const test of tests) {
        const testQuestionSet = test.questionSets;
        questionSets = [...questionSets, ...testQuestionSet];
      }
      setQuestionSets(questionSets);
      setTests(tests);
      setCurrentPage(page);
      setIsLastPage(false);
    } else {
      setIsLastPage(true);
    }
  };

  const refreshList = useCallback(
    (page: number = currentPage, limit: number = pageStep) => {
      DataStore.query(Test, Predicates.ALL, {
        sort: (e) => e.dateTime(SortDirection.DESCENDING),
        page: page,
        limit: limit,
      }).then((tests) => {
        if (tests.length > 0) {
          let questionSets: LocalQuestionSet[] = [];
          for (const test of tests) {
            const testQuestionSet = test.questionSets;
            questionSets = [...questionSets, ...testQuestionSet];
          }
          setQuestionSets(questionSets);

          setTests(tests);
        } else {
          if (page > 0) {
            setCurrentPage(page - 1);
            setIsLastPage(true);
            refreshList(page - 1, limit);
          }
        }
      });
    },
    [currentPage, pageStep],
  );

  useEffect(() => {
    refreshList();
  }, [refreshList, refreshTrigger]);

  return (
    <>
      {tests && tests.length > 0 && (
        <>
          <Divider />
          <VStack w="full" align="flex-start">
            <HStack w="full">
              <Heading size="sm">{title}</Heading>
              <Spacer />
              <Tooltip hasArrow label="Show report of all tests on this page">
                <IconButton
                  rounded="full"
                  variant="ghost"
                  aria-label="Show report"
                  colorScheme="teal"
                  size="sm"
                  w="35px"
                  h="35px"
                  icon={<Icon as={MdOutlineArticle} boxSize={6} />}
                  onClick={onOpenResultModal}
                />
              </Tooltip>
              <IconButton
                rounded="full"
                variant="ghost"
                aria-label="Refresh"
                icon={<Icon as={MdRefresh} boxSize={6} />}
                onClick={() => refreshList()}
              />
              <IconButton
                rounded="full"
                variant="ghost"
                aria-label="Before"
                icon={<Icon as={MdNavigateBefore} boxSize={6} />}
                isDisabled={currentPage === 0}
                onClick={() => changePageButtonClickedHandler(-1)}
              />
              <IconButton
                rounded="full"
                variant="ghost"
                aria-label="Before"
                icon={<Icon as={MdNavigateNext} boxSize={6} />}
                isDisabled={isLastPage}
                onClick={() => changePageButtonClickedHandler(1)}
              />
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<MdMenu />}
                  rounded="full"
                  variant="ghost"
                />
                <Box>
                  <MenuList>
                    <MenuGroup title="Items per page">
                      {[10, 20, 50, 100].map((count, index) => {
                        return (
                          <MenuItem
                            key={`menu-item-${index}`}
                            onClick={() => {
                              setPageStep(count);
                              refreshList(0, count);
                              setCurrentPage(0);
                              setIsLastPage(false);
                            }}
                          >
                            {count}
                          </MenuItem>
                        );
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
                      rounded="xl"
                      p={1}
                      key={index}
                      cursor="pointer"
                      _hover={{ bg: bgColor }}
                    >
                      <TestItem
                        test={test}
                        refreshList={refreshList}
                        selectCallback={selectCallback}
                      />
                    </WrapItem>
                  );
                })}
            </Wrap>
          </VStack>

          <Modal
            isOpen={isOpenResultModal}
            onClose={onCloseResultModal}
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Result questionSets={questionSets} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default TestList;
