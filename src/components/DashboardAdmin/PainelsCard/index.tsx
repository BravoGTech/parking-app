import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export interface IPanelCard {
  title: string;
  children: ReactNode;
  to?: string;
}

export const PainelsCard = ({ title, children, to }: IPanelCard) => {
  const navigate = useNavigate();
  return (
    <Card
      flexDir={"column"}
      gap="1rem"
      align={"center"}
      justify="center"
      p="2rem"
      w="250px"
      h='150px'
      textAlign={"center"}
      size="sx"
      borderRadius={"10px"}
      border="1px solid black"
      pos={"relative"}
    >
      {to && (
        <Box
          onClick={() => navigate(to)}
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