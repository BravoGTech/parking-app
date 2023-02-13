import React, { useState } from "react";
import {
  Box,
  Flex,
  useColorMode,
  Link,
  useDisclosure,
  Slide,
} from "@chakra-ui/react";
import { MenuToggle } from "./MenuToggle";
import { NavLinks } from "./NavLinks";

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex
        as="nav"
        wrap="wrap"
        bg="gray.800"
        color="white"
        flexDir={"column"}
        h="100vh"
      >
        <MenuToggle isOpen={isOpen} onToggle={onToggle} />
        <NavLinks isOpen={isOpen} onToggle={onToggle} />
      </Flex>
    </>
  );
};
