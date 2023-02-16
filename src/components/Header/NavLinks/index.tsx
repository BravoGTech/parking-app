import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Slide,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

import { MenuItem } from "./MenuItem";

export interface INavLinksProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const NavLinks = ({ isOpen, onToggle }: INavLinksProps) => {
  let location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Flex
      display={{ base: isOpen ? "flex" : "none", md: "flex" }}
      flexDir="column"
      p="1rem"
      w="100%"
    >
      <Flex gap="1rem" align={"center"}>
        <Avatar size={"md"} name="Igor Garcia" />
        <Flex flexDir={"column"} gap="0.5rem">
          <Heading size="sm">Bem Vindo</Heading>
          <Heading size="sm">Igor Garcia</Heading>
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
        // Uma visão geral do estacionamento, incluindo a quantidade de vagas
        disponíveis, vagas ocupadas, receita e outras métricas importantes
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/controlPainelAdmin"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Painel de Controle
        </MenuItem>
        //Uma seção que permita aos administradores adicionar, excluir ou editar
        vagas de estacionamento.
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/parking"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Gerenciamento de Vagas
        </MenuItem>
        //Uma seção que permita aos administradores ajustar as tarifas de
        estacionamento de acordo com a demanda ou outros fatores.
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/prices"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Gerenciamento de Preços
        </MenuItem>
        /Uma seção que permita aos administradores gerenciar informações de
        funcionarios, incluindo a emissão de faturas e pagamentos.
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/admin/worksManagement"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Gerenciamento de Funcionarios
        </MenuItem>
        //Uma seção que permita aos administradores gerar relatórios detalhados
        sobre o desempenho do estacionamento, incluindo estatísticas de tráfego
        e receita.
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="reports"
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
          >
            <BiLogOut size="24px" />
            <Text>Sair</Text>
          </Flex>
          <Flex
            transition={"0.3s"}
            cursor={"pointer"}
            _hover={{ bg: "gray" }}
            p="0.5rem"
            gap="1rem"
          >
            <BsGear size="24px" />
            <Text>Configurações</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
