import { Flex } from "@chakra-ui/react";
import { ParkingSlotManagementContent } from "../../../components/DashboardAdmin/ParkinSlotManagement";
import { Header } from "../../../components/Header";

export const ParkingSlotsManagementPage = () => {
  return (
    <Flex>
      <Header />
      <ParkingSlotManagementContent />
    </Flex>
  );
};
