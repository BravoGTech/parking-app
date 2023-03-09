import { Container, Flex, Heading } from "@chakra-ui/react";
import { Header } from "../../../components/Header";

export const ControlPainelEmployee = () => {
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
        <Heading size={"3xl"}>Painel de Controle</Heading>
        <Flex mt="2rem" wrap={"wrap"} gap="2rem" justify={"center"}></Flex>
      </Container>
    </Flex>
  );
};
