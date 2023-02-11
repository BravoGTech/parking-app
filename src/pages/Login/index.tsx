import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react";
import loginBg from "../../assets/loginbg.png";
import journey from "../../assets/1.png";
import { LoginForm } from "./LoginForm";
export const LoginPage = () => {
  return (
    <Container
      bgGradient={"linear-gradient(139deg, #5E5D7B 31%, #80506F 100%)"}
      maxW="10xl"
      h={{ base: "100%", md: "100vh" }}
      p="2rem 1rem"
    >
      <Flex flexDir={"column"} justify="center" align={"center"}>
        <Flex
          maxW={{ base: "300px", md: "700px" }}
          w="80%"
          m="0 auto"
          flexDir={{ base: "column", md: "row" }}
        >
          <Box w="100%" pos="relative">
            <Image rounded={"20px"} w="100%" src={journey} />
            <Heading
              color="white"
              pos="absolute"
              top={{ base: "30%", md: "30%" }}
              right={{base: "30px",md:"30%"}}
              fontSize={"4xl"}
              textShadow={"4px 3px 0px #7A7A7A"}
            >
              Lontra's Parking
            </Heading>
          </Box>
          <Flex
            ml={{ base: 0, md: "-30px" }}
            mt={{ base: "-180px", md: 0 }}
            w={{ base: "100%", md: "80%" }}
            bg="white"
            align={{base: "flex-start", md: "center"}}
            rounded={"20px"}
            zIndex="10"
          >
            <LoginForm />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
