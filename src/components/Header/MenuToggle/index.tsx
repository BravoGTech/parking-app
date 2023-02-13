import { Box, Flex } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

interface IMenuOpenProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuToggle = ({ isOpen, onToggle }: IMenuOpenProps) => {
  return (
    <Flex align={"flex-end"} w="100%" justify={"flex-start"}>
      <Box
        p="1rem"
        onClick={onToggle}
        display={{
          base: "block",
          md: "none",
        }}
      >
        {isOpen ? (
          <IoMdClose size={"30px"} cursor="pointer" />
        ) : (
          <GiHamburgerMenu size={"30px"} cursor="pointer" />
        )}
      </Box>
    </Flex>
  );
};
