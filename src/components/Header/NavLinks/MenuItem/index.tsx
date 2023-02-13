import { Link, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface IMenuLinksProps {
  children: ReactNode;
  to: string;
  onToggle: () => void;
  isOpen: boolean;
  activeLink: string;
  handleClick: (path: string) => void;
}

export const MenuItem = ({
  children,
  to,
  onToggle,
  isOpen,
  activeLink,
  handleClick,
  ...rest
}: IMenuLinksProps) => {
  return (
    <>
      <Link onClick={onToggle} _hover={{}} href={to}>
        <Text
          textAlign={["left", "left", "center", "center"]}
          display={"flex"}
          transition={"0.3s"}
          _hover={{ bg: "white", color: "gray.800" }}
          color={activeLink === to ? "gray.800" : "white"}
          bg={activeLink === to ? "white" : ""}
          p="0.5rem"
          onClick={() => handleClick(to)}
          {...rest}
        >
          {children}
        </Text>
      </Link>
    </>
  );
};
