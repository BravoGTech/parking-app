import { Container, Flex, Heading, Select, Spinner } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import { PageContainer } from "../../PageContainer";
import { UserReport } from "./userReport";


export const Reports = () => {
  const { data, isFetching } = useContext(UsersContext);

  const [userId, setUserId] = useState("");

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Container
          maxW={"8xl"}
          display="flex"
          flexDir={"column"}
          alignItems="center"
          overflowY="auto"
          p="0"
          h={{ base: "100vh" }}
        >
          <Heading mt="2rem" size={"2xl"} textAlign="center">
            Relatórios
          </Heading>
          <Flex
            flexDir={"column"}
            gap="2rem"
            align={"center"}
            justify="center"
            mt="2rem"
          >
            <Select onChange={(e) => setUserId(e.target.value)}>
              <option>Selecione o funcionário</option>
              {data.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.first_name}
                </option>
              ))}
            </Select>
          </Flex>
          {userId && <UserReport id={userId} />}
        </Container>
      )}
    </>
  );
};
