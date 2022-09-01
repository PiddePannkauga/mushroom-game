import { createIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  IconButton,
  Fade,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { iFungiResponse } from "../pages/api/game";
import { fetchGame } from "../queries/fungi";

const Game: NextPage = (): JSX.Element => {
  const { isLoading, error, data, refetch, isFetching } = useQuery<
    iFungiResponse,
    Error
  >(["fetchGame"], () => fetchGame());

  const [choices, setChoices] = useState<Array<string>>();
  const [buttonsClicked, setButtonsClicked] = useState<
    Array<HTMLButtonElement>
  >([]);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      data.randomNames.push(data.fungi.name);
      setChoices(data.randomNames.sort(() => Math.random() - 0.5));
    }
  }, [data]);

  const checkAnswer = (choice: HTMLButtonElement) => {
    if (choice.textContent && data && choice.textContent === data.fungi.name) {
      choice.style.backgroundColor = "green";
    } else if (choice.textContent) {
      choice.style.backgroundColor = "red";
    }
    setButtonsClicked([...buttonsClicked, choice]);
  };

  const resetGame = () => {
    setImageLoaded(false);
    buttonsClicked.forEach(
      (button) =>
        (button.style.backgroundColor = "var(--chakra-colors-whiteAlpha-200)")
    );
  };

  console.log(isFetching || isLoading);

  return (
    <>
      {data && (
        <Box boxSize="sm" width={"100%"}>
          <Center marginBottom={"2rem"}>
            <Image
              className={[imageLoaded ? "fade-in-image" : ""].join(" ")}
              onLoad={() => setImageLoaded(true)}
              boxSize={{ base: "300px", md: "600px" }}
              objectFit={"cover"}
              src={data.file}
              fallbackSrc={"/bigmushrooms.svg"}
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
              choices.map((name: string) => {
                return (
                  <Button
                    key={name}
                    onClick={(e) => checkAnswer(e.currentTarget)}
                    disabled={isFetching || !imageLoaded}
                  >
                    {name.split(".")[0]}
                  </Button>
                );
              })}
          </Flex>
          <Center marginTop={{ base: "2rem", md: "none" }}>
            <IconButton
              aria-label="Hämta ny svamp"
              width="fit-content"
              onClick={() => {
                refetch(), resetGame();
              }}
              title="Hämta ny svamp"
              disabled={isFetching}
              icon={
                <Mushroom
                  className={[
                    isFetching || !imageLoaded ? "spinMushroom" : "",
                  ].join()}
                  height={"auto"}
                  width="2rem"
                />
              }
            ></IconButton>
          </Center>
        </Box>
      )}
    </>
  );
};

export const Mushroom = createIcon({
  displayName: "Mushroom",
  viewBox: "0 0 24 24",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: [
    <path
      d="M10.5885 7.17985L7.41886 5.18883M10.5885 7.17985L7.34206 8.16268C6.93259 8.28664 6.64373 8.52137 6.54052 8.814L5.81446 10.8727C5.54009 11.6507 4.07607 11.8712 3.02337 11.2931L2.23326 10.8592C1.57567 10.4981 1.30264 9.9318 1.56397 9.47098L3.15928 6.65784C3.30124 6.4075 3.58811 6.2137 3.96656 6.11245L7.41886 5.18883M10.5885 7.17985L13.982 9.31148C14.572 9.68213 15.4047 9.80395 16.0586 9.61527L16.2757 9.55263C16.8403 9.38972 17.1725 9.02297 17.1413 8.59696L17.0322 7.10699L16.6012 5.18122C16.5521 4.96164 16.4096 4.74597 16.1901 4.55894L14.6615 3.25608C14.5304 3.14432 14.3743 3.04495 14.1998 2.96212L13.3677 2.56715C12.1142 1.97219 10.6847 1.58781 9.23306 1.45539L8.05917 1.3483C7.90803 1.33451 7.75775 1.33301 7.61188 1.34384L4.86891 1.54748C3.67034 1.67757 3.37456 2.64838 4.34733 3.25943L7.41886 5.18883"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      key={"path1"}
    />,
    <path
      d="M13.5578 17.0084L16.8085 18.8976M13.5578 17.0084L16.7611 15.9233C17.1651 15.7864 17.444 15.5427 17.5349 15.247L18.1745 13.1666C18.4162 12.3805 19.8701 12.1136 20.9462 12.6579L21.7539 13.0665C22.4261 13.4065 22.7226 13.9638 22.4807 14.4326L21.0039 17.2945C20.8725 17.5491 20.5939 17.7519 20.2199 17.8651L16.8085 18.8976M13.5578 17.0084L10.0776 14.9858C9.47245 14.6341 8.63523 14.5388 7.98963 14.7481L7.77529 14.8176C7.21786 14.9983 6.90121 15.3753 6.95017 15.8001L7.12139 17.2856L7.63255 19.1964C7.69084 19.4143 7.84221 19.6253 8.06932 19.8053L9.65136 21.0588C9.78706 21.1663 9.9472 21.2607 10.125 21.3379L10.9731 21.7062C12.2506 22.261 13.6952 22.5998 15.1514 22.6861L16.329 22.7559C16.4806 22.7649 16.6308 22.7616 16.7761 22.7462L19.5088 22.4556C20.7011 22.2876 20.9562 21.3081 19.9586 20.7283L16.8085 18.8976"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      key={"path2"}
    />,
  ],
});

export default Game;
