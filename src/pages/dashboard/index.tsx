import { type NextPage } from "next";

import { Heading } from "~/components/elements/Heading";
import { Default } from "~/components/layouts/Default";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

const Dashboard: NextPage = () => {
  return (
    <Default title="Dashboard">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <WrenchScrewdriverIcon className="h-24 w-24 text-gray-500" />
        <Heading>Em construção</Heading>
      </div>
    </Default>
  );
};

export default Dashboard;
