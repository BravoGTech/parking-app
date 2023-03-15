import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsGear } from "react-icons/bs";

export interface IPanelCard {
  title: string;
  children: ReactNode;
  onOpen?: () => void;
  color?: string;
  admin?: boolean;
}

export const PainelsCard = ({
  title,
  children,
  onOpen,
  color,
  admin,
}: IPanelCard) => {
  return (
    <Card
      flexDir={"column"}
      gap="1rem"
      align={"center"}
      justify="center"
      p="2rem"
      minW="180px"
      w="250px"
      h="150px"
      textAlign={"center"}
      size="sx"
      borderRadius={"10px"}
      border="1px solid black"
      pos={"relative"}
      bg={color}
      color={
        color === "green" ? "white" : color === "yellow" ? "black" : "black"
      }
    >
      {onOpen && admin && (
        <Box
          onClick={onOpen}
          pos={"absolute"}
          top="3"
          right="5"
          cursor={"pointer"}
        >
          <BsGear size="20px" />
        </Box>
      )}

      <CardHeader>
        <Heading size={"md"}>{title}</Heading>
      </CardHeader>
      <Divider />
      <CardBody>{children}</CardBody>
    </Card>
  );
};
