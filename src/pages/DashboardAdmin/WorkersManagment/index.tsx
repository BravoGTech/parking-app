import { Flex } from "@chakra-ui/react";
import { WorkersManagement } from "../../../components/DashboardAdmin/WorksManagement";
import { Header } from "../../../components/Header";

export const WorksManagement = () => {
  return (
    <Flex>
      <Header />
      <WorkersManagement />
    </Flex>
  );
};
