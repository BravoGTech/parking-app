import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export interface ILoginData {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { login, isFetching, error } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({
    username: yup.string().required("Usuario Obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILoginData) => {
    login(data);
  };

  return (
    <Container display={"flex"} flexDir="column" p="0 2rem">
      <Heading pt="1rem">Login</Heading>
      <Flex
        as="form"
        flexDir={"column"}
        gap="0.5rem"
        p="1rem 0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.username}>
          <FormLabel color={"#30313B"}>Usuário</FormLabel>
          <InputGroup>
            <InputLeftAddon
              bg={errors.username ? "#d61919" : "#30313B"}
              children={<FaRegUser />}
              color="white"
            />
            <Input
              variant="filled"
              placeholder="Digite seu usuário"
              {...register("username")}
            />
          </InputGroup>
          {!!errors.username && (
            <FormErrorMessage color="#d61919">
              {errors.username.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel color={"#30313B"}>Senha</FormLabel>
          <InputGroup>
            <InputLeftAddon
              bg={errors.password ? "#d61919" : "#30313B"}
              children={<RiLockPasswordLine />}
              color="white"
            />
            <Input
              variant="filled"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <InputRightElement
              cursor={"pointer"}
              children={
                showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputGroup>
          {!!errors.password && (
            <FormErrorMessage color="#d61919">
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormControl>
        {isFetching ? (
          <Button type="submit" bg="#30313B" color="white" mt="2rem">
            <Spinner />
          </Button>
        ) : (
          <Button type="submit" bg="#30313B" color="white" mt="2rem">
            Entrar
          </Button>
        )}
      </Flex>
    </Container>
  );
};
