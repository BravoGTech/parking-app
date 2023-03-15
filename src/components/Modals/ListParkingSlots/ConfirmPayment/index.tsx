import {
  Button,
  ButtonGroup,
  Flex,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ParkingInfoContext } from "../../../../contexts/ParkingInfoContext";
import { SalesContext } from "../../../../contexts/SalesContext";
import { SpotContext } from "../../../../contexts/SpotContext";
import { IUserModalProps } from "../../../../interfaces/UsersContext.interfaces";

export const ConfirmSale = ({ isOpen, onClose }: IUserModalProps) => {
  const { isFetching } = useContext(SpotContext);
  const { data } = useContext(ParkingInfoContext);
  const { saleProfileData, checkoutSale } = useContext(SalesContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [change, setChange] = useState<number>(0);

  if (!saleProfileData) {
    return <h1>...Carregando</h1>;
  }

  const checkIn = new Date(saleProfileData.checkinTime);
  const checkout = new Date();

  const basePrice = +data.priceByHour;

  const additionalPricePerHour = 2;

  const diffInMilliseconds = checkout.getTime() - checkIn.getTime();

  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  let newPrice = Math.ceil(diffInHours * +basePrice);

  if (newPrice <= +data.priceByHour) {
    newPrice = +data.priceByHour;
  }

  for (let i = 1; i < diffInHours; i++) {
    newPrice += additionalPricePerHour;
  }

  const handleClose = () => {
    setPaymentMethod("");
    onClose();
  };

  const handleCheckout = () => {
    const saleId = saleProfileData.id;
    checkoutSale({ saleId, paymentMethod });
    onClose();
  };

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          isCentered
          size="lg"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Checkout {saleProfileData.carBrand}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading textAlign={"center"} size={"lg"}>
                Resumo
              </Heading>
              <Flex mt="1rem" align={"center"} justify="space-between">
                <VStack>
                  <VStack spacing={0}>
                    <Text fontSize={"14px"}>
                      Data: {checkIn.toLocaleDateString()}
                    </Text>
                    <Text fontSize={"14px"}>
                      Entrada: {checkIn.toLocaleTimeString()}
                    </Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text fontSize={"14px"}>
                      Data: {checkout.toLocaleDateString()}
                    </Text>
                    <Text fontSize={"14px"}>
                      Saida: {checkout.toLocaleTimeString()}
                    </Text>
                  </VStack>
                </VStack>
                <VStack>
                  <Heading size={"md"}>Preço a pagar: </Heading>
                  <Heading size="md">
                    {newPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Heading>
                </VStack>
              </Flex>
              <VStack>
                <FormLabel mt="3rem">Metodo de Pagamento</FormLabel>
                <Select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="default">
                    Selecione o metodo de pagamento
                  </option>
                  <option value="DIN">Dinheiro</option>
                  <option value="PIX">PIX</option>
                  <option value="CC">Cartão de Crédito</option>
                  <option value="CD">Cartão de Débito</option>
                </Select>

                {paymentMethod === "DIN" ? (
                  <>
                    <Flex flexDir={"column"} gap="1rem" w="100%">
                      <Flex justify={"space-around"} align={"center"}>
                        <InputGroup>
                          <InputLeftAddon children="R$" />
                          <Input
                            type={"number"}
                            placeholder="Digite o valor recebido"
                            onChange={(e) => setChange(+e.target.value)}
                          />
                        </InputGroup>
                      </Flex>
                      {change! < newPrice ? (
                        <Text textAlign={"center"}>Valor recebido menor</Text>
                      ) : (
                        <Text textAlign={"center"}>
                          Troco:{" "}
                          {(+change - +newPrice)!.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Text>
                      )}
                      <ButtonGroup justifyContent={"flex-end"}>
                        <Button colorScheme={"red"}>Cancelar</Button>
                        <Button
                          colorScheme={"blue"}
                          isDisabled={change! < newPrice}
                          onClick={handleCheckout}
                        >
                          Checkout
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  </>
                ) : (
                  <Flex justify={"flex-end"} w="100%" gap="0.8rem">
                    <Button colorScheme={"red"}>Cancelar</Button>
                    <Button onClick={handleCheckout} colorScheme={"blue"}>
                      Checkout
                    </Button>
                  </Flex>
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
