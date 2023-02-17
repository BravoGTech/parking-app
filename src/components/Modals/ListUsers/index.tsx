import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import {
  IRegisterUserData,
  IUserModalProps,
} from "../../../interfaces/UsersContext.interfaces";

export const ListUsersModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching, userData, listUser } = useContext(UsersContext);
  const [userId, setUserId] = useState<string>("default");

  console.log(userData);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Listar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Selecione o funcionário</Text>
            <Select
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            >
              <option value="default">Selecione o funcionario</option>
              {isFetching ? (
                <Spinner />
              ) : (
                data.map((user: IRegisterUserData) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.first_name}
                    </option>
                  );
                })
              )}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={userId === "default"}
              onClick={() => listUser(userId)}
              colorScheme="blue"
            >
              Visualizar
            </Button>
          </ModalFooter>
          {userId !== "default" && userData && (
            <VStack align={"flex-start"} p="0.5rem 1rem">
              <Box>
                <Heading size={"sm"}>Nome:</Heading>
                <Text>{userData?.first_name}</Text>
              </Box>
              <Box>
                <Heading size={"sm"}>Sobrenome:</Heading>
                <Text>{userData?.last_name}</Text>
              </Box>
              <Box>
                <Heading size={"sm"}>Email:</Heading>
                <Text>{userData?.email}</Text>
              </Box>
              <Box>
                <Heading size={"sm"}>username:</Heading>
                <Text>{userData?.username}</Text>
              </Box>
              <Box>
                <Heading size={"sm"}>Veiculos Cadastrados:</Heading>
                <Text>{userData?.sales.length}</Text>
              </Box>
            </VStack>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
