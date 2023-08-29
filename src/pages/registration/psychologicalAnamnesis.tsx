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
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { type PersonType } from "./documentsEmission";

const PsychologicalAnamnesis: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createPsychologicalAnamnesis,
    isLoading: isLoadingCreatePsychologicalAnamnesis,
  } = api.resident.psychologicalAnamnesis.useMutation({});

  const [psychologicalAnamnesis, setPsychologicalAnamnesis] = useState({
    feeling: "",
    opportunitiesLeisure: "",
    sleepQuality: "",
    isPerformsPhysicalActivity: "",
    physicalActivities: "",
    selfCare: "",
    typesOfThinking: "",
    haveSupportPeople: "",
    supportPeople: "",

    doesPsychologicalFollowUp: "",
    doesPsychiatricFollowUp: "",
    isUseMedication: "",
    wouldSeekHelp: "",
    observation: "",
    guidance: "",
    whatCanWeOffer: "",
  });

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
        feeling: psychologicalAnamnesis.feeling,

        opportunitiesLeisure: psychologicalAnamnesis.opportunitiesLeisure,
        sleepQuality: psychologicalAnamnesis.sleepQuality,
        isPerformsPhysicalActivity:
          psychologicalAnamnesis.isPerformsPhysicalActivity,
        physicalActivities: psychologicalAnamnesis.physicalActivities,
        selfCare: psychologicalAnamnesis.selfCare,
        typesOfThinking: psychologicalAnamnesis.typesOfThinking,
        haveSupportPeople: psychologicalAnamnesis.haveSupportPeople,
        supportPeople: psychologicalAnamnesis.supportPeople,

        // 2- SAÚDE MENTAL
        doesPsychologicalFollowUp:
          psychologicalAnamnesis.doesPsychologicalFollowUp,
        doesPsychiatricFollowUp: psychologicalAnamnesis.doesPsychiatricFollowUp,
        isUseMedication: psychologicalAnamnesis.isUseMedication,
        wouldSeekHelp: psychologicalAnamnesis.wouldSeekHelp,
        observation: psychologicalAnamnesis.observation,
        guidance: psychologicalAnamnesis.guidance,
        whatCanWeOffer: psychologicalAnamnesis.whatCanWeOffer,

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setPsychologicalAnamnesis({
        feeling: "",
        opportunitiesLeisure: "",
        sleepQuality: "",
        isPerformsPhysicalActivity: "",
        physicalActivities: "",
        selfCare: "",
        typesOfThinking: "",
        haveSupportPeople: "",
        supportPeople: "",

        // 2- SAÚDE MENTAL

        doesPsychologicalFollowUp: "",
        doesPsychiatricFollowUp: "",
        isUseMedication: "",
        wouldSeekHelp: "",
        observation: "",
        guidance: "",
        whatCanWeOffer: "",
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
        <Heading>Anamnese Psicológica</Heading>

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
            <Text size="lg">1- CONDIÇÃO EMOCIONAL</Text>
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[80%]">
                  Qual melhor sentimento descreve como você está se sentindo
                  hoje?
                </label>
              </Text>

              <TextField
                variant="filled"
                value={psychologicalAnamnesis.feeling}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    feeling: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Como você avalia suas oportunidades de lazer?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.opportunitiesLeisure}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    opportunitiesLeisure: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="MUITO_RUIM"
                  control={<Radio />}
                  label="Muito Ruim"
                />
                <FormControlLabel
                  value="RUIM"
                  control={<Radio />}
                  label="Ruim"
                />
                <FormControlLabel
                  value="NEM_RUIM_NEM_BOA"
                  control={<Radio />}
                  label="Nem ruim, nem boa"
                />
                <FormControlLabel value="BOA" control={<Radio />} label="Boa" />
                <FormControlLabel
                  value="MUITO_BOA"
                  control={<Radio />}
                  label="Muito boa"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Como você avalia seu sono? Apresenta dificuldades para dormir?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.sleepQuality}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    sleepQuality: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="MUITO_RUIM"
                  control={<Radio />}
                  label="Muito Ruim"
                />
                <FormControlLabel
                  value="RUIM"
                  control={<Radio />}
                  label="Ruim"
                />
                <FormControlLabel
                  value="NEM_RUIM_NEM_BOA"
                  control={<Radio />}
                  label="Nem ruim, nem boa"
                />
                <FormControlLabel value="BOA" control={<Radio />} label="Boa" />
                <FormControlLabel
                  value="MUITO_BOA"
                  control={<Radio />}
                  label="Muito boa"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você realiza alguma atividade física regularmente?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.isPerformsPhysicalActivity}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    isPerformsPhysicalActivity: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel
                  value="AS_VEZES"
                  control={<Radio />}
                  label="Às vezes"
                />
              </RadioGroup>
            </div>

            {psychologicalAnamnesis.isPerformsPhysicalActivity ===
              "AS_VEZES" && (
              <TextField
                label="Quais esportes?"
                variant="filled"
                value={psychologicalAnamnesis.physicalActivities}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    physicalActivities: event.target.value,
                  })
                }
              />
            )}
            {psychologicalAnamnesis.isPerformsPhysicalActivity === "SIM" && (
              <TextField
                label="Quais esportes?"
                variant="filled"
                value={psychologicalAnamnesis.physicalActivities}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    physicalActivities: event.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Como você avalia seu autocuidado?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.selfCare}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    selfCare: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="MUITO_RUIM"
                  control={<Radio />}
                  label="Muito Ruim"
                />
                <FormControlLabel
                  value="RUIM"
                  control={<Radio />}
                  label="Ruim"
                />
                <FormControlLabel
                  value="NEM_RUIM_NEM_BOA"
                  control={<Radio />}
                  label="Nem ruim, nem boa"
                />
                <FormControlLabel value="BOA" control={<Radio />} label="Boa" />
                <FormControlLabel
                  value="MUITO_BOA"
                  control={<Radio />}
                  label="Muito boa"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Atualmente, você tem mais sentimentos bons ou ruins em sua
                  vida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.typesOfThinking}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    typesOfThinking: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="BONS"
                  control={<Radio />}
                  label="Bons"
                />
                <FormControlLabel
                  value="RUINS"
                  control={<Radio />}
                  label="Ruins"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  Quando você passa por algum problema, tem pessoas que lhe
                  apoiem, ajudem, estejam por perto?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.haveSupportPeople}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    haveSupportPeople: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {psychologicalAnamnesis.haveSupportPeople === "SIM" && (
              <TextField
                label="Quem?"
                variant="filled"
                value={psychologicalAnamnesis.supportPeople}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    supportPeople: event.target.value,
                  })
                }
              />
            )}

            <Text size="lg">2- SAÚDE MENTAL</Text>
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Já fez ou faz acompanhamento psicológico? Se sim, por que?
                  Quando? Já encerrou ou está em andamento?
                </label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.doesPsychologicalFollowUp}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    doesPsychologicalFollowUp: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Já fez ou faz acompanhamento com psiquiatra? Se sim, por que?
                  Quando? Já encerrou ou está em andamento?
                </label>
              </Text>
              <TextField
                label=""
                multiline
                rows={2}
                variant="filled"
                value={psychologicalAnamnesis.doesPsychiatricFollowUp}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    doesPsychiatricFollowUp: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Atualmente, faz uso de alguma medicação?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                value={psychologicalAnamnesis.isUseMedication}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    isUseMedication: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Você buscaria, voluntariamente, atendimentos psicológicos,
                  caso fossem de forma gratuita?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                value={psychologicalAnamnesis.wouldSeekHelp}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    wouldSeekHelp: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Observações importantes percebidas na nossa interação com
                  vocês (postura,comportamento, apresentação, atendimentos,
                  etc...)
                </label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.observation}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    observation: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[80%]">
                  Tem alguma orientação que você gostaria de receber da equipe
                  de Psicologia sobre um assunto relacionado a Saúde Mental
                  (depressão, ansiedade, autocuidados, ... )
                </label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.guidance}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    guidance: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[80%]">
                  Tem algo que nós, projeto GAIA, podemos ofertar para a
                  comunidade?
                </label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.whatCanWeOffer}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    whatCanWeOffer: event.target.value,
                  })
                }
              />
            </div>

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

export default PsychologicalAnamnesis;
