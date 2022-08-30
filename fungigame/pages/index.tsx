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
        <title>Lär dig svampar</title>
        <meta name="description" content="svamp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={{ base: "none", md: "center" }}
          marginTop={{ base: "2rem", md: "20%" }}
        >
          <Game />
        </Flex>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
