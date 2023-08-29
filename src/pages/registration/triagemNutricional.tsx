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

const TriagemNutrional: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createPsychologicalAnamnesis,
    isLoading: isLoadingCreatePsychologicalAnamnesis,
  } = api.resident.triagemNutricional.useMutation({});

  const [psychologicalAnamnesis, setPsychologicalAnamnesis] = useState({
    acessoPostoSaude: "",
    frequentaCentroSaude: "",
    estadoProprioSaude: "",
    fazParteGrupoCentroSaude: "",

    qualGrupoCentroSaude: "",

    deixoFazerAtividadePorMotivoSaude: "",
    quantosDiasDeixoDeFazerAtividade: "",

    principaisMotivosQueImpediu: "",
    principaisMotivosQueImpediuOutro: "",

    acamado: "",

    quandoEstaDoenteProcura: "",
    how: "",

    frequenciaComidaEnlatada: "",
    frequenciaLegume: "",
    // 1
    precupacaoFaltaAlimento: "",
    // 2
    faltaramAlimento: "",
    // 3
    faltaramAlimentoPorDinheiro: "",
    // 4
    apenasAlgunsAlimentosPorDinheiro: "",
    // 5
    adultoFaltouPorDinheiro: "",
    // 6
    adultoApenasAlgunsAlimentosPorDinheiro: "",
    // 7
    perguntaUm: "",
    // 8
    perguntaDois: "",
    // 9
    perguntaTres: "",
    // 10
    perguntaQuatro: "",
    // 11
    perguntaCinco: "",
    // 12
    perguntaSeis: "",
    // 13
    perguntaSete: "",
    // 14
    perguntaOito: "",

    idade: "",
    peso: "",
    alturo: "",
    imc: "",
    cq: "",
    cc: "",
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
        ...psychologicalAnamnesis,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setPsychologicalAnamnesis({
        acessoPostoSaude: "",
        frequentaCentroSaude: "",
        estadoProprioSaude: "",
        fazParteGrupoCentroSaude: "",

        qualGrupoCentroSaude: "",

        deixoFazerAtividadePorMotivoSaude: "",
        quantosDiasDeixoDeFazerAtividade: "",

        principaisMotivosQueImpediu: "",
        principaisMotivosQueImpediuOutro: "",

        acamado: "",

        quandoEstaDoenteProcura: "",
        how: "",

        frequenciaComidaEnlatada: "",
        frequenciaLegume: "",
        // 1
        precupacaoFaltaAlimento: "",
        // 2
        faltaramAlimento: "",
        // 3
        faltaramAlimentoPorDinheiro: "",
        // 4
        apenasAlgunsAlimentosPorDinheiro: "",
        // 5
        adultoFaltouPorDinheiro: "",
        // 6
        adultoApenasAlgunsAlimentosPorDinheiro: "",
        // 7
        perguntaUm: "",
        // 8
        perguntaDois: "",
        // 9
        perguntaTres: "",
        // 10
        perguntaQuatro: "",
        // 11
        perguntaCinco: "",
        // 12
        perguntaSeis: "",
        // 13
        perguntaSete: "",
        // 14
        perguntaOito: "",

        idade: "",
        peso: "",
        alturo: "",
        imc: "",
        cq: "",
        cc: "",
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
        <Heading>Triagem Nutricional</Heading>

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
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você tem acesso a posto de saúde público (ou Unidade Básica de
                  Saúde) próximo da sua comunidade.
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.acessoPostoSaude}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    acessoPostoSaude: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Frequenta o Centro de Saúde da sua área?</label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.frequentaCentroSaude}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    frequentaCentroSaude: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  De um modo geral você considera o seu próprio estado de saúde:
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.estadoProprioSaude}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    estadoProprioSaude: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="MUITO BOM"
                  control={<Radio />}
                  label="Muito bom"
                />
                <FormControlLabel value="BOM" control={<Radio />} label="Bom" />
                <FormControlLabel
                  value="REGULAR"
                  control={<Radio />}
                  label="Regular"
                />
                <FormControlLabel
                  value="RUIM"
                  control={<Radio />}
                  label="Ruim"
                />
                <FormControlLabel
                  value="MUITO RUIM"
                  control={<Radio />}
                  label="Muito Ruim"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Faz parte de algum GRUPO no Centro de Saúde?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.fazParteGrupoCentroSaude}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    fazParteGrupoCentroSaude: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {psychologicalAnamnesis.fazParteGrupoCentroSaude === "SIM" && (
              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label className="max-w-[80%]">Qual?</label>
                </Text>

                <RadioGroup
                  value={psychologicalAnamnesis.qualGrupoCentroSaude}
                  onChange={(event) =>
                    setPsychologicalAnamnesis({
                      ...psychologicalAnamnesis,
                      qualGrupoCentroSaude: event.target.value,
                    })
                  }
                  row
                >
                  <FormControlLabel
                    value="PIS"
                    control={<Radio />}
                    label="PIS (Prática integrativa de saúde)"
                  />
                  <FormControlLabel
                    value="Diabetes"
                    control={<Radio />}
                    label="Diabetes"
                  />
                  <FormControlLabel
                    value="Hipertensão"
                    control={<Radio />}
                    label="Hipertensão"
                  />
                </RadioGroup>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nas últimas semanas você deixou de realizar quaisquer de suas
                  atividades habituais por motivo de saúde? (trabalhar, ir à
                  igreja, encontrar com parentes e amigos, tarefas domésticas,
                  fazer compras, etc.)
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.deixoFazerAtividadePorMotivoSaude}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    deixoFazerAtividadePorMotivoSaude: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Quantos dias você deixou de realizar suas atividades
                  habituais?
                </label>
              </Text>
              <TextField
                label=""
                variant="filled"
                value={psychologicalAnamnesis.quantosDiasDeixoDeFazerAtividade}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    quantosDiasDeixoDeFazerAtividade: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  Qual o principal motivo que te impediu de realizar suas
                  atividades habituais nas últimas semanas?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.principaisMotivosQueImpediu}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    principaisMotivosQueImpediu: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Diarréia ou vômito"
                  control={<Radio />}
                  label="Diarréia ou vômito"
                />
                <FormControlLabel
                  value="Problema odontológico"
                  control={<Radio />}
                  label="Problema odontológico"
                />
                <FormControlLabel
                  value="Agressão"
                  control={<Radio />}
                  label="Agressão"
                />
                <FormControlLabel
                  value="Problemas Respiratórios"
                  control={<Radio />}
                  label="Problemas Respiratórios"
                />
                <FormControlLabel
                  value="Sofreu queda"
                  control={<Radio />}
                  label="Sofreu queda"
                />
                <FormControlLabel
                  value="Acidente de trânsito"
                  control={<Radio />}
                  label="Acidente de trânsito"
                />
                <FormControlLabel
                  value="Problema emocional ou mental"
                  control={<Radio />}
                  label="Problema emocional ou mental"
                />
                <FormControlLabel
                  value="Problema no coração ou Pressão"
                  control={<Radio />}
                  label="Problema no coração ou Pressão"
                />
                <FormControlLabel
                  value="Gripe/resfriado/indisposição"
                  control={<Radio />}
                  label="Gripe/resfriado/indisposição"
                />
                <FormControlLabel
                  value="Febre"
                  control={<Radio />}
                  label="Febre"
                />
                <FormControlLabel
                  value="Dor na coluna, joelhos ou dificuldade de se locomover"
                  control={<Radio />}
                  label="Dor na coluna, joelhos ou dificuldade de se locomover"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nas últimas 4 semanas esteve ACAMADO ?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.acamado}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    acamado: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  Quando está doente ou precisando de atendimento de saúde,
                  costuma procurar:
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.quandoEstaDoenteProcura}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    quandoEstaDoenteProcura: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Centro de Saúde ou Posto"
                  control={<Radio />}
                  label="Centro de Saúde ou Posto"
                />
                <FormControlLabel
                  value="Pronto Socorro"
                  control={<Radio />}
                  label="Pronto Socorro"
                />
                <FormControlLabel
                  value="Ambulatório ou consultório do convênio"
                  control={<Radio />}
                  label="Ambulatório ou consultório do convênio"
                />
                <FormControlLabel
                  value="Outro"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {psychologicalAnamnesis.quandoEstaDoenteProcura === "Outro" && (
              <TextField
                label="Qual"
                variant="filled"
                value={psychologicalAnamnesis.how}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    how: event.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  Qual a frequência que sua família consome alimentos
                  enlatados/industrializados (conserva, sardinha, mortadela,
                  etc.)?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.frequenciaComidaEnlatada}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    frequenciaComidaEnlatada: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Diariamente."
                  control={<Radio />}
                  label="Diariamente."
                />
                <FormControlLabel
                  value="Regularmente (2 a 4 vezes na semana)."
                  control={<Radio />}
                  label="Regularmente (2 a 4 vezes na semana)."
                />
                <FormControlLabel
                  value="Semanalmente (1 vez por semana)."
                  control={<Radio />}
                  label="Semanalmente (1 vez por semana)."
                />
                <FormControlLabel
                  value="Mensalmente (1 vez por mês)"
                  control={<Radio />}
                  label="Mensalmente (1 vez por mês)"
                />
                <FormControlLabel
                  value="Esporadicamente"
                  control={<Radio />}
                  label="Esporadicamente"
                />
                <FormControlLabel
                  value="Não consome"
                  control={<Radio />}
                  label="Não consome"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label id="Genero" className="max-w-[70%]">
                  Qual a frequência que sua família consome legumes, frutas e/ou
                  verduras?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.frequenciaLegume}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    frequenciaLegume: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Diariamente."
                  control={<Radio />}
                  label="Diariamente."
                />
                <FormControlLabel
                  value="Regularmente (2 a 4 vezes na semana)."
                  control={<Radio />}
                  label="Regularmente (2 a 4 vezes na semana)."
                />
                <FormControlLabel
                  value="Semanalmente (1 vez por semana)."
                  control={<Radio />}
                  label="Semanalmente (1 vez por semana)."
                />
                <FormControlLabel
                  value="Mensalmente (1 vez por mês)"
                  control={<Radio />}
                  label="Mensalmente (1 vez por mês)"
                />
                <FormControlLabel
                  value="Esporadicamente"
                  control={<Radio />}
                  label="Esporadicamente"
                />
                <FormControlLabel
                  value="Não consome"
                  control={<Radio />}
                  label="Não consome"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, os moradores deste domicílio tiveram
                  preocupação de que os alimentos acabassem antes de poderem
                  comprar ou receber mais comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.precupacaoFaltaAlimento}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    precupacaoFaltaAlimento: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, os alimentos acabaram antes que os
                  moradores deste domicílio tivessem dinheiro para comprar mais
                  comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.faltaramAlimento}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    faltaramAlimento: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, os moradores deste domicílio ficaram
                  sem dinheiro para ter uma alimentação saudável e variada?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.faltaramAlimentoPorDinheiro}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    faltaramAlimentoPorDinheiro: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, os moradores deste domicílio comeram
                  apenas alguns alimentos que ainda tinham porque o dinheiro
                  acabou?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.apenasAlgunsAlimentosPorDinheiro}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    apenasAlgunsAlimentosPorDinheiro: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, algum morador de 18 anos ou mais de
                  idade deixou de fazer uma refeição porque não havia dinheiro
                  para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.adultoFaltouPorDinheiro}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    adultoFaltouPorDinheiro: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, algum morador de 18 anos ou mais de
                  idade, alguma vez comeu menos do que devia porque não havia
                  dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={
                  psychologicalAnamnesis.adultoApenasAlgunsAlimentosPorDinheiro
                }
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    adultoApenasAlgunsAlimentosPorDinheiro: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, algum morador de 18 anos ou mais de
                  idade, alguma vez sentiu fome, mas não comeu, porque não havia
                  dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaUm}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaUm: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, Algum morador de 18 anos ou mais de
                  idade, alguma vez, fez apenas uma refeição ao dia ou ficou um
                  dia inteiro sem comer porque não havia dinheiro para comprar
                  comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaDois}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaDois: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, algum morador com menos de 18 anos de
                  idade, alguma vez, deixou de ter uma alimentação saudável e
                  variada porque não havia dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaTres}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaTres: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, algum morador com menos de 18 anos de
                  idade, alguma vez, não comeu quantidade suficiente de comida
                  porque não havia dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaQuatro}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaQuatro: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, alguma vez, foi diminuída a quantidade
                  de alimentos das refeições de algum morador com menos de 18
                  anos de idade, porque não havia dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaCinco}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaCinco: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, alguma vez, algum morador com menos de
                  18 anos de idade deixou de fazer alguma refeição, porque não
                  havia dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaSeis}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaSeis: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, alguma vez, algum morador com menos de
                  18 anos de idade sentiu fome, mas não comeu porque não havia
                  dinheiro para comprar comida?
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaSete}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaSete: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">
                  Nos últimos três meses, alguma vez, algum morador com menos de
                  18 anos de idade, fez apenas uma refeição ao dia ou ficou sem
                  comer por um dia inteiro porque não havia dinheiro para
                  comprar comida
                </label>
              </Text>

              <RadioGroup
                value={psychologicalAnamnesis.perguntaOito}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    perguntaOito: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="NÃO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NÃO SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <Text size="lg">ANTROPOMETRIA</Text>
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">Idade</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.idade}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    idade: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">Peso</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.peso}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    peso: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">Altura</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.alturo}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    alturo: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">IMC</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.imc}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    imc: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">CQ</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.cq}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    cq: event.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label className="max-w-[80%]">CC</label>
              </Text>
              <TextField
                label=""
                multiline
                rows={4}
                variant="filled"
                value={psychologicalAnamnesis.cc}
                onChange={(event) =>
                  setPsychologicalAnamnesis({
                    ...psychologicalAnamnesis,
                    cc: event.target.value,
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

export default TriagemNutrional;
