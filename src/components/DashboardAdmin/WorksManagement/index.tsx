import {
  Container,
  Divider,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import { Painel } from "../Painel";
import { PainelsCard } from "../PainelsCard";
import { FiUserPlus, FiUserMinus, FiUsers, FiUser } from "react-icons/fi";
import { RegisterUserModal } from "../../Modals/RegisterUser";
import { DeleteUserModal } from "../../Modals/DeleteUser";
import { ListUsersModal } from "../../Modals/ListUsers";
import { EditUserModal } from "../../Modals/EditUser";

export const WorkersManagement = () => {
  const { data, isFetching } = useContext(UsersContext);
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();
  const {
    isOpen: isOpenList,
    onOpen: onOpenList,
    onClose: onCloseList,
  } = useDisclosure();

  return (
    <>
      <Container
        maxW="8xl"
        display="flex"
        flexDir={"column"}
        alignItems="center"
        ml={{ base: "3rem", md: 0 }}
      >
        <Heading mt="2rem" size={"2xl"} textAlign="center">
          Gerenciamento de Funcionários
        </Heading>
        <Flex
          flexDir={"column"}
          gap="2rem"
          align={"center"}
          justify="center"
          mt="2rem"
        >
          <PainelsCard title="Numero de Funcionários">
            <Heading size={"sm"}>
              {isFetching ? <Spinner /> : data.length - 1} Funcionários
            </Heading>
          </PainelsCard>
          <Divider />
          <Flex
            flexDir={{ base: "row", md: "row" }}
            wrap={{ base: "wrap" }}
            gap="2rem"
            align={"center"}
            justify="center"
          >
            <Painel
              onOpen={onOpenRegister}
              icon={FiUserPlus}
              bgColor="green"
              color="white"
            >
              Cadastrar funcionário
            </Painel>
            <Painel
              onOpen={onOpenRemove}
              icon={FiUserMinus}
              bgColor="red"
              color="white"
            >
              Deletar funcionário
            </Painel>
            <Painel onOpen={onOpenEdit} icon={FiUser} bgColor="yellow" color="">
              Atualizar funcionário
            </Painel>
            <Painel
              onOpen={onOpenList}
              icon={FiUsers}
              bgColor="blue"
              color="white"
            >
              Listar funcionários
            </Painel>
          </Flex>
        </Flex>
      </Container>
      <RegisterUserModal isOpen={isOpenRegister} onClose={onCloseRegister} />
      <EditUserModal isOpen={isOpenEdit} onClose={onCloseEdit} />
      <DeleteUserModal isOpen={isOpenRemove} onClose={onCloseRemove} />
      <ListUsersModal isOpen={isOpenList} onClose={onCloseList} />
    </>
  );
};
