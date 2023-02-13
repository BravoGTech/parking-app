import { Container, Flex, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { BalancePainel } from "../../components/DashboardAdmin/BalancePainel";

import { OccupationPainel } from "../../components/DashboardAdmin/OccupationPainel";
import { PriceByHour } from "../../components/DashboardAdmin/PriceByHourPainel";

import { Header } from "../../components/Header";

export const ControlPainelAdminPage = () => {
  const token = localStorage.getItem("@Parking:Token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Flex>
      <Header />
      <Container
        maxW={"8xl"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
        p="2rem"
        overflowY="auto"
        h={{ base: "100vh", md: "100%" }}
      >
        <Heading size={"3xl"}>Painel de Controle</Heading>
        <Flex mt="2rem" wrap={"wrap"} gap="2rem" justify={"center"}>
          <OccupationPainel />
          <BalancePainel />
          <PriceByHour />
        </Flex>
      </Container>
    </Flex>
  );
};
