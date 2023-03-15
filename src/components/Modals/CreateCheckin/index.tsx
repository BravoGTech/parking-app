import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SpotContext } from "../../../contexts/SpotContext";

import { IUserModalProps } from "../../../interfaces/UsersContext.interfaces";
import { carBrands } from "../../../utils/carBrandsData";
import { ICheckinData } from "../../../interfaces/SalesContext.interfaces";
import { SalesContext } from "../../../contexts/SalesContext";

export const CreateCheckinModal = ({ isOpen, onClose }: IUserModalProps) => {
  const { data, isFetching } = useContext(SpotContext);
  const { checkinSale } = useContext(SalesContext);

  const chekcinSchema = yup.object().shape({
    carPlate: yup
      .string()
      .required("Campo obrigatório")
      .min(7, "Precisa ter 7 dígitos")
      .max(7, "Precisa ter 7 dígitos"),
    carBrand: yup.string().required("Campo obrigatório"),
    spotNumber: yup.number().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICheckinData>({
    resolver: yupResolver(chekcinSchema),
  });

  const onSubmit = (data: ICheckinData) => {
    checkinSale({ data });
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.carPlate}>
                <InputGroup>
                  <Flex flexDir={"column"} w="100%">
                    <FormLabel>Placa do Carro</FormLabel>
                    <Input
                      maxLength={7}
                      placeholder="ABC1234"
                      {...register("carPlate")}
                    />
                    {errors.carPlate ? (
                      <FormErrorMessage>
                        {errors.carPlate.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText>Ex: ABC1234</FormHelperText>
                    )}
                  </Flex>
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!errors.carBrand}>
                <InputGroup>
                  <Flex flexDir={"column"} w="100%">
                    <Select {...register("carBrand")}>
                      <option value="">Selecione a marca do veículo</option>
                      {carBrands.sort().map((carBrand, index) => (
                        <option key={index} value={carBrand}>
                          {carBrand}
                        </option>
                      ))}
                    </Select>
                    {errors.carBrand && (
                      <FormErrorMessage>
                        {errors.carBrand.message}
                      </FormErrorMessage>
                    )}
                  </Flex>
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={!!errors.spotNumber}>
                <InputGroup>
                  <Flex flexDir={"column"} w="100%">
                    <Select {...register("spotNumber")}>
                      <option value="">Selecione a vaga</option>
                      {isFetching ? (
                        <Spinner />
                      ) : (
                        <>
                          {data
                            .filter((spot) => spot.isAvaliable)
                            .map((spotNumber) => (
                              <option
                                key={spotNumber.id}
                                value={spotNumber.number}
                              >
                                {spotNumber.number}
                              </option>
                            ))}
                        </>
                      )}
                    </Select>
                    {errors.spotNumber && (
                      <FormErrorMessage>
                        {errors.spotNumber.message}
                      </FormErrorMessage>
                    )}
                  </Flex>
                </InputGroup>
              </FormControl>
              <Button colorScheme={"green"} type="submit">
                Checkin
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
