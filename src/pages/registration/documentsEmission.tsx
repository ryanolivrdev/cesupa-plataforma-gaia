/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";

import { api } from "~/utils/api";

import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/elements/Button";
import { Heading } from "~/components/elements/Heading";
import { Text } from "~/components/elements/Text";
import { Default } from "~/components/layouts/Default";

import { ToastContainer, toast } from "react-toastify";

import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export type PersonType = {
  id: string;
  name: "";
  socialName: "";
  birthDate: Date;
  gender: "";
  raceColor: "";
  religion: "";
  birthPlace: "";
  susCard: "";
  phone: "";
  isChild: false;
  class: "";
  responsibleId: "";
  profession: "";
  maritalStatus: "";
  children: 0;
  agesOfChildren: [0];
  liveTogether: false;
  schooling: "";
  healthPlan: "";
  conditionsAccessTreatedWater: "";
  accessToTreatedWater: false;
  accessToSewage: false;
};

const DocumentsEmission: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createDocumentsEmission,
    isLoading: isLoadingCreateDocumentsEmission,
  } = api.resident.documentsEmission.useMutation({});

  const [selectedPerson, setSelectedPerson] = useState<PersonType>();

  const residents = useMemo(() => {
    if (!data) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return data.map((resident: any) => ({
      ...resident,
      label: resident.name,
    }));
  }, [data]);

  const [documentsPerson, setDocumentsPerson] = useState({
    isLiveInTheCommunity: false,

    isHaveBirthCertificate: false,
    BirthCertificateObs: "",
    isHaveRg: false,
    rgNumber: "",
    isHaveCpf: false,
    cpfNumber: "",
    doesNotHaveCpfandRg: false,
    dontHaveRgCpfObs: "",
    lostDocument: false,
    isHaveElectedTitle: false,
    isHaveCTPS: false,
    whichWayIsNeeded: "",
    isHaveVaccinationCard: false,
    pendingDocuments: "",
    other: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPerson = (event: any, value: PersonType) => {
    setSelectedPerson(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      await createDocumentsEmission({
        ...documentsPerson,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setDocumentsPerson({
        isLiveInTheCommunity: false,

        isHaveBirthCertificate: false,
        BirthCertificateObs: "",
        isHaveRg: false,
        rgNumber: "",
        isHaveCpf: false,
        cpfNumber: "",
        doesNotHaveCpfandRg: false,
        dontHaveRgCpfObs: "",
        lostDocument: false,
        isHaveElectedTitle: false,
        isHaveCTPS: false,
        whichWayIsNeeded: "",
        isHaveVaccinationCard: false,
        pendingDocuments: "",
        other: "",
      });

      setSelectedPerson(undefined);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Erro ao registrar informacao!");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetch();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  return (
    <Default title="Emissão de Documentos">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <Heading>Emissão de Documentos</Heading>

        <div className="flex w-full flex-col">
          <Autocomplete
            options={residents}
            value={selectedPerson}
            onChange={handleSelectPerson}
            renderInput={(params) => (
              <TextField {...params} label="Selecione uma pessoa" />
            )}
          />

          {selectedPerson && (
            <div className="mt-4 flex flex-col gap-4">
              {selectedPerson.socialName && (
                <Text size="lg">Nome social: {selectedPerson.socialName}</Text>
              )}
              {selectedPerson.responsibleId && (
                <Text size="lg">
                  Responsável:{" "}
                  {
                    residents.find(
                      (resident) => resident.id === selectedPerson.responsibleId
                    )?.name
                  }
                </Text>
              )}

              {selectedPerson.phone && (
                <Text size="lg">Telefone: {selectedPerson.phone}</Text>
              )}

              <Text size="lg">
                Data de nascimento:{" "}
                {selectedPerson.birthDate.toLocaleString("pt-BR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </Text>
              <Text size="lg">
                Idade:{" "}
                {new Date().getFullYear() -
                  selectedPerson.birthDate.getFullYear()}
              </Text>
            </div>
          )}
        </div>

        <div className="flex h-[1px] w-full flex-col bg-slate-950" />
        {selectedPerson && (
          <form className="flex w-full flex-col gap-7" onSubmit={handleSubmit}>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={documentsPerson.isLiveInTheCommunity}
                  onChange={(e) =>
                    setDocumentsPerson({
                      ...documentsPerson,
                      isLiveInTheCommunity: e.target.checked,
                    })
                  }
                />
              }
              label="Vive na comunidade?"
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={documentsPerson.isHaveBirthCertificate}
                  onChange={(e) =>
                    setDocumentsPerson({
                      ...documentsPerson,
                      isHaveBirthCertificate: e.target.checked,
                    })
                  }
                />
              }
              label="Possui Certidão de Nascimento?"
            />

            <TextField
              label="Observações"
              variant="filled"
              value={documentsPerson.BirthCertificateObs}
              onChange={(e) =>
                setDocumentsPerson({
                  ...documentsPerson,
                  BirthCertificateObs: e.target.value,
                })
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={documentsPerson.isHaveRg}
                  onChange={(e) =>
                    setDocumentsPerson({
                      ...documentsPerson,
                      isHaveRg: e.target.checked,
                    })
                  }
                />
              }
              label="Possui RG?"
            />

            {documentsPerson.isHaveRg && (
              <TextField
                label="Numero do RG"
                variant="filled"
                value={documentsPerson.rgNumber}
                onChange={(e) =>
                  setDocumentsPerson({
                    ...documentsPerson,
                    rgNumber: e.target.value,
                  })
                }
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={documentsPerson.isHaveCpf}
                  onChange={(e) =>
                    setDocumentsPerson({
                      ...documentsPerson,
                      isHaveCpf: e.target.checked,
                    })
                  }
                />
              }
              label="Possui CPF?"
            />

            {documentsPerson.isHaveCpf && (
              <TextField
                label="Numero do Cpf"
                variant="filled"
                value={documentsPerson.cpfNumber}
                onChange={(e) =>
                  setDocumentsPerson({
                    ...documentsPerson,
                    cpfNumber: e.target.value,
                  })
                }
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={documentsPerson.doesNotHaveCpfandRg}
                  onChange={(e) =>
                    setDocumentsPerson({
                      ...documentsPerson,
                      doesNotHaveCpfandRg: e.target.checked,
                    })
                  }
                />
              }
              label="Não possui RG e CPF"
            />

            <TextField
              label="Observações"
              variant="filled"
              value={documentsPerson.dontHaveRgCpfObs}
              onChange={(e) =>
                setDocumentsPerson({
                  ...documentsPerson,
                  dontHaveRgCpfObs: e.target.value,
                })
              }
            />

            {!selectedPerson.isChild && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    checked={documentsPerson.isHaveElectedTitle}
                    onChange={(e) =>
                      setDocumentsPerson({
                        ...documentsPerson,
                        isHaveElectedTitle: e.target.checked,
                      })
                    }
                  />
                }
                label="Possui título de eleitor?"
              />
            )}

            {!selectedPerson.isChild && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    checked={documentsPerson.isHaveCTPS}
                    onChange={(e) =>
                      setDocumentsPerson({
                        ...documentsPerson,
                        isHaveCTPS: e.target.checked,
                      })
                    }
                  />
                }
                label="Possui CTPS?"
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Qual a via necessária?</label>
              </Text>

              <RadioGroup
                value={documentsPerson.whichWayIsNeeded}
                onChange={(e) =>
                  setDocumentsPerson({
                    ...documentsPerson,
                    whichWayIsNeeded: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Primeira"
                  control={<Radio />}
                  label="1"
                />
                <FormControlLabel
                  value="Segunda"
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel
                  value="Terceira"
                  control={<Radio />}
                  label="3"
                />
                <FormControlLabel
                  value="Segunda"
                  control={<Radio />}
                  label="4"
                />
                <FormControlLabel
                  value="Quarta"
                  control={<Radio />}
                  label="+"
                />
              </RadioGroup>
            </div>

            {!selectedPerson.isChild && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    checked={documentsPerson.lostDocument}
                    onChange={(e) =>
                      setDocumentsPerson({
                        ...documentsPerson,
                        lostDocument: e.target.checked,
                      })
                    }
                  />
                }
                label="Extraviado"
              />
            )}

            {selectedPerson.isChild && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    checked={documentsPerson.isHaveVaccinationCard}
                    onChange={(e) =>
                      setDocumentsPerson({
                        ...documentsPerson,
                        isHaveVaccinationCard: e.target.checked,
                      })
                    }
                  />
                }
                label="Possui Carteira de vacinação?"
              />
            )}

            <TextField
              label="Documento pendente:"
              variant="filled"
              value={documentsPerson.pendingDocuments}
              onChange={(e) =>
                setDocumentsPerson({
                  ...documentsPerson,
                  pendingDocuments: e.target.value,
                })
              }
            />

            <TextField
              label="Quem vai buscar o documento:"
              variant="filled"
              value={documentsPerson.other}
              onChange={(e) =>
                setDocumentsPerson({
                  ...documentsPerson,
                  other: e.target.value,
                })
              }
            />

            <Button type="submit" disabled={isLoadingCreateDocumentsEmission}>
              {isLoadingCreateDocumentsEmission ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        )}
        <ToastContainer pauseOnFocusLoss theme="colored" />
      </div>
    </Default>
  );
};

export default DocumentsEmission;
