import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import styled from "@emotion/styled";

import Head from "next/head";
import { ReactElement } from "react";

const siteTitle: string = "dev.cubdesign.com";

const Container = styled("div")`
  padding: 0;
`;

const Main = styled("main")`
  min-height: 100vh;
  padding: 0 2rem 2rem 2rem;
`;

type DefaultLayoutProps = {
  title: string;
  description: string;
  children: ReactElement;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

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

        <meta
          property="og:image"
          content={`https://og-image.cubdesign.com/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <Main>{children}</Main>

      <Footer />
    </Container>
  );
};

export default DefaultLayout;
