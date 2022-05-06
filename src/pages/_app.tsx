import "@/styles/globals.css";
import "@/styles/prism-shades-of-purple.css";
import type { AppPropsWithLayout } from "next/app";

import { googleTagManagerId } from "@/utils/gtm";
import GoogleTagManager, {
  GoogleTagManagerId,
} from "@/components/GoogleTagManager";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  <GoogleTagManager
    googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
  />;
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
