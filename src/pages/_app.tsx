import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import { AppProvider } from "~/contexts/AppProvider";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
