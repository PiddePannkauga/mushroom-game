import { Box, Button, Center, Flex, Image, Wrap } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGame } from "../queries/fungi";
import { iFungi } from "../types/fungi";

const Game: NextPage = (): JSX.Element => {
  const { isLoading, error, data, refetch } = useQuery<iFungi, Error>(
    ["fetchGame"],
    () => fetchGame()
  );

  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState();

  useEffect(() => {
    if (data) {
      data[index].randomNames.push(data[index].fungi.name);
      setChoices(data[index].randomNames.sort(() => Math.random() - 0.5));
    }
  }, [index, data]);

  const checkAnswer = (choice: HTMLButtonElement) => {
    if (choice.textContent === data[index].fungi.name.split(".")[0]) {
      choice.style.backgroundColor = "green";
    } else {
      choice.style.backgroundColor = "red";
    }
  };

  return (
    <>
      {data && (
        <Box boxSize="sm" width={"100%"}>
          <Center marginBottom={"2rem"}>
            <Image
              boxSize="400px"
              objectFit="cover"
              src={data[index].file}
              alt="Svampen som du ska gissa"
              border="10px"
              borderColor="white"
              borderStyle="solid"
            />
          </Center>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            gap="4"
          >
            {choices &&
              choices.map((name) => {
                return (
                  <Button onClick={(e) => checkAnswer(e.currentTarget)}>
                    {name.split(".")[0]}
                  </Button>
                );
              })}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Game;
