import BadgePanel from "@/components/Admin/BadgePanel";
import MessagePanel from "@/components/Admin/MessagePanel";
import QuestionPanel from "@/components/Admin/QuestionPanel";
import Layout from "@/components/Common/Layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

function Admin() {

  return (
    <Layout>
      <Tabs isFitted w='full' colorScheme='teal'>
        <TabList>
          <Tab>Badge</Tab>
          <Tab>Bad Questions</Tab>
          <Tab>System Message</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BadgePanel />
          </TabPanel>
          <TabPanel>
            <QuestionPanel />
          </TabPanel>
          <TabPanel>
            <MessagePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export default Admin
