import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalFooter,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  IUpdateFormProps,
  IUpdateUserData,
} from "../../../interfaces/UsersContext.interfaces";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { UsersContext } from "../../../contexts/UsersContext";
import { useQuery } from "react-query";
import { api } from "../../../services/api";

export const EditUserForm = ({ userId }: IUpdateFormProps) => {
  const {} = useContext(UsersContext);
  const [showPassword, setShowPassword] = useState(false);

  const { data, isFetching } = useQuery([userId], async () => {
    const token = localStorage.getItem("@Parking:Token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`users/${userId}/`);
    return response.data;
  });

  console.log(data);

  const registerSchema = z.object({
    first_name: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(20, "O nome deve ter no máximo 20 caracteres")
      .optional(),
    last_name: z
      .string()
      .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
      .max(20, "O sobrenome deve ter no máximo 20 caracteres")
      .optional(),
    username: z
      .string()
      .min(3, "O username deve ter pelo menos 3 caracteres")
      .max(30, "O username deve ter no máximo 20 caracteres")
      .optional(),
    password: z
      .string()
      .min(8, "O password deve ter pelo menos 8 caracteres")
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senah deve ter pelo menos uma letra maiúscula",
      })
      .refine((value) => /\W/.test(value), {
        message: "A senha deve ter pelo menos um caractere especial",
      })
      .optional(),
    email: z.string().email("Insira um email válido").optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUserData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IUpdateUserData) => {
    console.log(data);
  };

  return (
    <>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.first_name}>
          <FormLabel>Nome</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.first_name && "crimson"}
            focusBorderColor={errors.first_name && "crimson"}
            placeholder="Insira seu nome"
            {...register("first_name")}
          />
          {!!errors.first_name && (
            <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.last_name}>
          <FormLabel>Sobrenome</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.last_name && "crimson"}
            focusBorderColor={errors.last_name && "crimson"}
            placeholder="Insira seu sobrenome"
            {...register("last_name")}
          />
          {!!errors.last_name && (
            <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.email && "crimson"}
            focusBorderColor={errors.email && "crimson"}
            placeholder="Insira o seu email"
            {...register("email")}
          />
          {!!errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>email@email.com</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            isInvalid
            errorBorderColor={errors.username && "crimson"}
            focusBorderColor={errors.username && "crimson"}
            placeholder="Insira o nome de usuário"
            {...register("username")}
          />
          {!!errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              isInvalid
              errorBorderColor={errors.password && "crimson"}
              focusBorderColor={errors.password && "crimson"}
              placeholder="Insira sua senha"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <InputRightElement
              cursor="pointer"
              children={
                showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputGroup>
          {!!errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <ModalFooter>
          <Button type="submit" colorScheme="blue">
            {isFetching ? <Spinner /> : "Cadastrar"}
          </Button>
        </ModalFooter>
      </VStack>
    </>
  );
};
