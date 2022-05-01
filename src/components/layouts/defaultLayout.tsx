import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import styled from "@emotion/styled";

import Head from "next/head";
import { ReactElement } from "react";

const Container = styled("div")`
  padding: 0;
`;

const Main = styled("main")`
  min-height: 100vh;
  padding: 2rem 2rem;
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
      </Head>

      <Header />

      <Main>{children}</Main>

      <Footer />
    </Container>
  );
};

export default DefaultLayout;
