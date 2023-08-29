import { NextSeo } from "next-seo";
import { useState, type ReactNode } from "react";

import { NoScript } from "~/utils/noScript";
import { Loading } from "../elements/Loading";
import { Navbar } from "../modules/Navbar";
import { Sidebar } from "../modules/Sidebar";

interface DefaultProps {
  title?: string;
  description?: string;
  path?: string;
  children: ReactNode;
}

export function Default({ title, description, path, children }: DefaultProps) {
  // const router = useRouter();
  // const { data: sessionData, status } = useSession();
  const [loading, setLoading] = useState(false);

  const url = `https://plataforma-gaia.vercel.app${path ?? ""}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
        }}
      />
      {loading ? (
        <>
          <Loading />
          <NoScript />
        </>
      ) : (
        <div className="flex flex-col bg-gray-100">
          <Navbar />
          <Sidebar />
          <main className="flex min-h-[calc(100vh_-_4rem)] flex-col items-center justify-center px-2 md:min-h-[calc(100vh_-_5rem)]">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
