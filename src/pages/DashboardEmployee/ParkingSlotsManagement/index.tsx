import { Container, Flex, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { ParkingSlotsEmployee } from "../../../components/DashboardEmployee/ParkingManagement";
import { Header } from "../../../components/Header";

export const ParkingSlotsPage = () => {
  const token = localStorage.getItem("@Parking:Token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Flex>
      <Header employee />
      <Container
        maxW={"5xl"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
        p="2rem"
        overflowY="auto"
        h={{ base: "100vh", md: "100%" }}
      >
        <Heading size={"3xl"}>Vagas</Heading>
        <ParkingSlotsEmployee />
      </Container>
    </Flex>
  );
};
