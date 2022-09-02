import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Game from "../components/game";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gissa Svampen</title>
        <meta name="description" content="svamp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Flex
          justifyContent={"center"}
          marginTop={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "6rem" }}
        >
          <Game />
        </Flex>
      </main>
    </div>
  );
};

export default Home;
