import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { UsersContext } from "../../../contexts/UsersContext";

import { MenuItem } from "./MenuItem";

export interface INavLinksProps {
  isOpen: boolean;
  onToggle: () => void;
  employee?: boolean;
}

export const NavLinks = ({ isOpen, onToggle, employee }: INavLinksProps) => {
  const { userProfile, userProfilData, isFetching } = useContext(UsersContext);

  let location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("@Parking:Token");

  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      userProfile();
    }
  }, [isOpen]);

  if (isFetching) {
    return <Spinner />;
  }

  const fullName = `${userProfilData?.first_name} ${userProfilData?.last_name}`;

  return (
    <>
      {employee ? (
        <Flex
          display={{ base: isOpen ? "flex" : "none", md: "flex" }}
          flexDir="column"
          p="1rem"
          w="100%"
        >
          <Flex gap="1rem" align={"center"}>
            <Avatar size={"md"} name={fullName} />
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading size="sm">Bem Vindo</Heading>
              <Heading size="sm">
                {userProfilData?.first_name} {userProfilData?.last_name}
              </Heading>
            </Flex>
          </Flex>
          <Divider m="1rem 0" />
          <Stack
            overflowY={"auto"}
            mt="1rem"
            spacing={"1rem"}
            direction={["column"]}
            w="100%"
          >
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/employee/controlPainel"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Painel de Controle
            </MenuItem>
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/employee/parkingSlot"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Gerenciamento de Vagas
            </MenuItem>
          </Stack>
          <Flex mt="1rem" flexDir={"column"} gap="1rem">
            <Divider />
            <Flex w="100%">
              <Flex
                transition={"0.3s"}
                cursor={"pointer"}
                _hover={{ bg: "red" }}
                p="0.5rem 1rem"
                gap="1rem"
                onClick={logout}
                borderRadius="8px"
              >
                <BiLogOut size="24px" />
                <Text>Sair</Text>
              </Flex>
              {/* <Flex
                transition={"0.3s"}
                cursor={"pointer"}
                _hover={{ bg: "gray" }}
                p="0.5rem"
                gap="1rem"
              >
                <BsGear size="24px" />
                <Text>Configurações</Text>
              </Flex> */}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          display={{ base: isOpen ? "flex" : "none", md: "flex" }}
          flexDir="column"
          p="1rem"
          w="100%"
        >
          <Flex gap="1rem" align={"center"}>
            <Avatar size={"md"} name={fullName} />
            <Flex flexDir={"column"} gap="0.5rem">
              <Heading size="sm">Bem Vindo</Heading>
              <Heading size="sm">
                {userProfilData?.first_name} {userProfilData?.last_name}
              </Heading>
            </Flex>
          </Flex>
          <Divider m="1rem 0" />
          <Stack
            overflowY={"auto"}
            mt="1rem"
            spacing={{ sm: "1rem" }}
            direction={["column"]}
            w="100%"
          >
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/controlPainelAdmin"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Painel de Controle
            </MenuItem>
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/parkingManagementAdmin"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Gerenciamento de Vagas
            </MenuItem>
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/worksManagementAdmin"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Gerenciamento de Funcionarios
            </MenuItem>
            <MenuItem
              onToggle={onToggle}
              isOpen={isOpen}
              to="/reportsAdmin"
              activeLink={activeLink}
              handleClick={handleClick}
            >
              Relatórios
            </MenuItem>
          </Stack>
          <Flex mt="1rem" flexDir={"column"} gap="1rem">
            <Divider />
            <Flex align={"center"} justify="space-evenly">
              <Flex
                transition={"0.3s"}
                cursor={"pointer"}
                _hover={{ bg: "red" }}
                p="0.5rem 1rem"
                gap="1rem"
                onClick={logout}
                borderRadius="2px"
                w="100%"
              >
                <BiLogOut size="24px" />
                <Text>Sair</Text>
              </Flex>
              {/* <Flex
                transition={"0.3s"}
                cursor={"pointer"}
                _hover={{ bg: "gray" }}
                p="0.5rem"
                gap="1rem"
              >
                <BsGear size="24px" />
                <Text>Configurações</Text>
              </Flex> */}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
