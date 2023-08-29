import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Default } from "~/components/layouts/Default";
import { TextInput } from "~/components/elements/TextInput";
import {
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Heading } from "~/components/elements/Heading";

const Database: NextPage = () => {
  // const linkRef = useRef()
  // const { data: residents, isLoading: isResidentsLoading } =
  //   api.resident.getAll.useQuery();
  // const { mutateAsync } = api.resident.download.useMutation({});

  // async function handleDownload() {
  //   const file = await mutateAsync();
  //   const link = document.createElement('a');
  //   link.href = file.downloadUrl;
  //   link.download = 'residentes.xlsx';
  //   link.click();
  // }
  const isResidentsLoading = true

  return (
    <Default title="Database">
      {isResidentsLoading ? (
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-green-500" />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full gap-5 overflow-x-auto rounded-md bg-white px-4 py-4 md:w-96">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <Heading size="sm">Buscar Pessoa</Heading>
                <TextInput.Root className="max-w-[18rem]">
                  <TextInput.Icon>
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </TextInput.Icon>
                  <TextInput.Input placeholder="Nome" />
                </TextInput.Root>
              </div>

              <div className="flex gap-4 pb-2">
                <div
                  className="h-5 w-5 cursor-pointer self-center rounded-full transition-colors hover:bg-gray-200"
                  title="Filtrar"
                >
                  <FunnelIcon className="h-5 w-5" />
                </div>

                {/* <div
                  className="h-5 w-5 cursor-pointer self-center rounded-full transition-colors hover:bg-gray-200"
                  title="Baixar planilha"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={handleDownload}
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </div> */}
              </div>
            </div>
            {/* <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {residents?.map((resident, index) => (
                  <tr key={resident.id} className="hover transition-colors">
                    <th>{index + 1}</th>
                    <td>{resident.name}</td>
                    <td>{resident.cpf ?? "Sem Cpf"}</td>
                    <td>{resident.phone ?? "Sem número"}</td>
                    <th>
                      <Link href={`/database/${resident.id}`}>
                        <button className="btn-ghost btn-xs btn">
                          Detalhes
                        </button>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </>
      )}
    </Default>
  );
};

export default Database;
