/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "~/components/elements/Button";
import { Heading } from "~/components/elements/Heading";
import { Text } from "~/components/elements/Text";
import { Default } from "~/components/layouts/Default";
import { api } from "~/utils/api";

import {
  Autocomplete,
  CircularProgress,
  TextField
} from "@mui/material";
import { type PersonType } from "./documentsEmission";

const AtendimentoMedico: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createPsychologicalAnamnesis,
    isLoading: isLoadingCreatePsychologicalAnamnesis,
  } = api.resident.atendimentoMedico.useMutation({});

  const [atendimentoMedico, setAtendimentoMedico] = useState({
    data: new Date().toLocaleDateString("pt-BR"),
    peso: "",
    altura: "",
    imc: "",
    pressaoArterial: "",
    queixaPrincipal: "",
    evolucao: "",
    isda: "",
    exameFisico: "",
    geral: "",
    auscultaCardiaca: "",
    auscultaRespiratoria: "",
    abdominal: "",
    hipoteseDiagnostica: "",
    conduta: "",
  });

  const [medico, setMedico] = useState("")

  const residents = useMemo(() => {
    if (!data) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return data.map((resident: any) => ({
      ...resident,
      label: resident.name,
    }));
  }, [data]);

  const [selectedPerson, setSelectedPerson] = useState<PersonType>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPerson = (event: any, value: PersonType) => {
    setSelectedPerson(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      await createPsychologicalAnamnesis({
        ...atendimentoMedico,
        medico: medico,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setAtendimentoMedico({
        data: new Date().toLocaleDateString("pt-BR"),
        peso: "",
        altura: "",
        imc: "",
        pressaoArterial: "",
        queixaPrincipal: "",
        evolucao: "",
        isda: "",
        exameFisico: "",
        geral: "",
        auscultaCardiaca: "",
        auscultaRespiratoria: "",
        abdominal: "",
        hipoteseDiagnostica: "",
        conduta: "",
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
    <Default title="Anamnese Psicológica">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <Heading>Atendimento Médico</Heading>

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
              <Text size="lg">
                Cartão Sus: {selectedPerson.susCard ?? "Não tem"}
              </Text>
            </div>
          )}
        </div>

        <div className="flex h-[1px] w-full flex-col bg-slate-950" />

        {selectedPerson && (
          <form className="flex w-full flex-col gap-7" onSubmit={handleSubmit}>
            <TextField
              label="Data da consulta"
              variant="filled"
              value={atendimentoMedico.data}
              onChange={(e) => setAtendimentoMedico({
                ...atendimentoMedico,
                data: e.target.value
              })}
            />

            <TextField
              label="Peso"
              variant="filled"
              value={atendimentoMedico.peso}
              onChange={(e) => setAtendimentoMedico({
                ...atendimentoMedico,
                peso: e.target.value
              })}
            />

            <TextField
              label="Altura"
              variant="filled"
              value={atendimentoMedico.altura}
              onChange={(e) => setAtendimentoMedico({
                ...atendimentoMedico,
                altura: e.target.value
              })}
            />

            <TextField
              label="IMC"
              variant="filled"
              value={atendimentoMedico.imc}
              onChange={(e) => setAtendimentoMedico({
                ...atendimentoMedico,
                imc: e.target.value
              })}
            />

            <TextField
              label="Pessão Arterial"
              variant="filled"
              value={atendimentoMedico.pressaoArterial}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  pressaoArterial: e.target.value
                })
              }
            />

            <TextField
              label="Queixa principal"
              variant="filled"
              multiline
              rows={4}
              value={atendimentoMedico.queixaPrincipal}
              onChange={(e) =>
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  queixaPrincipal: e.target.value
                })
              }
            />

            <TextField
              label="Evoluçao"
              variant="filled"
              multiline
              rows={4}
              value={atendimentoMedico.evolucao}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  evolucao: e.target.value
                })
              }
            />

            <TextField
              label="ISDA"
              variant="filled"
              multiline
              rows={4}
              value={atendimentoMedico.isda}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  isda: e.target.value
                })
              }
            />

            <TextField
              label="Exame físico"
              variant="filled"
              multiline
              rows={4}
              value={atendimentoMedico.exameFisico}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  exameFisico: e.target.value
                })
              }
            />

            <TextField
              label="Geral"
              variant="filled"
              multiline
              rows={4}
              value={atendimentoMedico.geral}
              onChange={(e) =>
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  geral: e.target.value
                })
              }
            />

            <TextField
              label="Ausculta Cardíaca"
              variant="filled"
              multiline
              rows={3}
              value={atendimentoMedico.auscultaCardiaca}
              onChange={(e) =>
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  auscultaCardiaca: e.target.value
                })
              }
            />

            <TextField
              label="Ausculta Respiratoria"
              variant="filled"
              multiline
              rows={3}
              value={atendimentoMedico.auscultaRespiratoria}
              onChange={(e) =>
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  auscultaRespiratoria: e.target.value
                })
              }
            />

            <TextField
              label="Abdominal"
              variant="filled"
              multiline
              rows={3}
              value={atendimentoMedico.abdominal}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  abdominal: e.target.value
                })
              }
            />

            <TextField
              label="Hipotese Diagnostica"
              variant="filled"
              multiline
              rows={3}
              value={atendimentoMedico.hipoteseDiagnostica}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  hipoteseDiagnostica: e.target.value
                })
              }
            />

            <TextField
              label="Conduta"
              variant="filled"
              multiline
              rows={3}
              value={atendimentoMedico.conduta}
              onChange={(e) => 
                setAtendimentoMedico({
                  ...atendimentoMedico,
                  conduta: e.target.value
                })
              }
            />

            <TextField
              label="Nome do Medico"
              variant="filled"
              value={medico}
              onChange={(e) => {
                setMedico(e.target.value)
              }}
            />

            <Button
              type="submit"
              disabled={isLoadingCreatePsychologicalAnamnesis}
            >
              {isLoadingCreatePsychologicalAnamnesis ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        )}
        <ToastContainer pauseOnFocusLoss theme="colored" />
      </div>
    </Default>
  );
};

export default AtendimentoMedico;
