import DefaultLayout from "@/components/layouts/defaultLayout";
import { NextPageWithLayout } from "next";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return (
    <>
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK! <br />
      OK!
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="dev.cubdesign.com"
      description="dev.cubdesign.com"
      pageTitle="Welcome to dev.cubdesign.com"
    >
      {page}
    </DefaultLayout>
  );
};

export default Home;
