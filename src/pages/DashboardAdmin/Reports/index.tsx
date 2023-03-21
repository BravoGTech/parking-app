import { Flex } from "@chakra-ui/react";
import { Reports } from "../../../components/DashboardAdmin/Reports";

import { Header } from "../../../components/Header";

export const ReportsPage = () => {
  return (
    <Flex>
      <Header />
      <Reports />
    </Flex>
  );
};
