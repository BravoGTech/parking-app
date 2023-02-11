import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export const LoginForm = () => {
  return (
    <Container display={"flex"} flexDir="column" gap="1rem" p="0 2rem">
      <Heading pt="3rem">Login</Heading>
      <Flex as="form" flexDir={"column"} gap="1rem" p="1rem 0">
        <FormControl>
          <FormLabel color={"#30313B"}>Usuário</FormLabel>
          <InputGroup>
            <InputLeftAddon
              bg="#30313B"
              children={<FaRegUser />}
              color="white"
            />
            <Input variant="filled" placeholder="Digite seu usuário" />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel color={"#30313B"}>Senha</FormLabel>
          <InputGroup>
            <InputLeftAddon
              bg="#30313B"
              children={<RiLockPasswordLine />}
              color="white"
            />
            <Input variant="filled" placeholder="Digite sua senha" />
          </InputGroup>
        </FormControl>
        <Button bg="#30313B" color="white" mt="2rem">
          Entrar
        </Button>
      </Flex>
    </Container>
  );
};
