import { Container, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface IPageContainerProps {
  children: ReactNode;
  title: string;
}

export const PageContainer = ({ children, title }: IPageContainerProps) => {
  return (
    <Container
      maxW="8xl"
      display="flex"
      flexDir={"column"}
      alignItems="center"
      ml={{ base: "3rem", md: 0 }}
    >
      <Heading mt="2rem" size={"2xl"} textAlign="center">
        {title}
      </Heading>
      <Flex
        flexDir={"column"}
        gap="2rem"
        align={"center"}
        justify="center"
        mt="2rem"
      >
        {children}
      </Flex>
    </Container>
  );
};
