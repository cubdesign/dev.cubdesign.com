import styled from "@emotion/styled";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Container = styled("div")`
  padding: 0 2rem;
`;

const Main = styled("main")`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled("h1")`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: underline;
  }
`;

const Footer = styled("footer")`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

const Logo = styled("span")`
  height: 1em;
  margin-left: 0.5rem;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>dev.cubdesign.com</title>
        <meta name="description" content="dev.cubdesign.com" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
      </Head>

      <Main>
        <Title>Welcome to dev.cubdesign.com</Title>
      </Main>

      <Footer>
        <a
          href="https://cubdesign.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy;
          <Logo>
            <Image
              src="/static/cubdesign-logo-circle.png"
              alt="cubdesign Logo"
              width={16}
              height={16}
            />
          </Logo>
          cubdesign
        </a>
      </Footer>
    </Container>
  );
};

export default Home;
