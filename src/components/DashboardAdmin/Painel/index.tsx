import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface IPainelProps {
  icon: IconType;
  children: ReactNode;
  bgColor?: string;
  color?: string;
  onOpen: () => void;
}

export const Painel = ({
  icon: Icon,
  children,
  bgColor,
  color,
  onOpen,
}: IPainelProps) => {
  return (
    <Flex
      flexDir={"column"}
      borderRadius={"10px"}
      border="1px solid black"
      p="1rem"
      align={"center"}
      cursor="pointer"
      maxW={{ base: "130px" }}
      gap="0.5rem"
      _hover={{ bg: bgColor, color: color }}
      transition="0.3s"
      onClick={onOpen}
      minW="130px"
      minH="130px"
      alignContent={"center"}
      justify="center"
    >
      <Icon size="35px" />
      <Text textAlign={"center"}>{children}</Text>
    </Flex>
  );
};
