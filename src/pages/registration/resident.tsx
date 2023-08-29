/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/elements/Button";
import { Heading } from "~/components/elements/Heading";
import { Default } from "~/components/layouts/Default";
import { api } from "~/utils/api";

import { ToastContainer, toast } from "react-toastify";
import { Text } from "~/components/elements/Text";

import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";

const Resident: NextPage = () => {
  const { mutateAsync: createResident, isLoading: isLoadingCreateResident } =
    api.resident.registerGeneral.useMutation({});

  const { data, refetch } = api.resident.getResponsible.useQuery({});
  const { data: residentsApi, refetch: refetchApi } =
    api.resident.getAll.useQuery({});

  const responsibles = useMemo(() => {
    if (!data) return [];

    return data.map((responsible) => ({
      id: responsible.id,
      label: responsible.name,
    }));
  }, [data]);

  const residents = useMemo(() => {
    if (!residentsApi) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return residentsApi.map((resident: any) => ({
      ...resident,
      label: resident.name,
    }));
  }, [residentsApi]);

  const [resident, setResident] = useState({
    name: "",
    socialName: "",
    birthDate: "",
    gender: "",
    raceColor: "",
    religion: "",
    birthPlace: "",
    susCard: "",
    phone: "",
    isChild: false,
    class: "",
    responsible: {
      id: "",
      name: "",
    },
    profession: "",
    maritalStatus: "",
    children: 0,
    agesOfChildren: [0],
    liveTogether: false,
    schooling: "",
    healthPlan: "",
    conditionsAccessTreatedWater: "",
    accessToTreatedWater: false,
    accessToSewage: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      await createResident({
        name: resident.name,
        socialName: resident.socialName,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'birthDate' does not exist on type '{}'.
        birthDate: resident.birthDate,
        gender: resident.gender,
        raceColor: resident.raceColor,
        religion: resident.religion,
        birthPlace: resident.birthPlace,
        susCard: resident.susCard,
        phone: resident.phone,
        isChild: resident.isChild,
        class: resident.class,
        responsibleId: resident.responsible.id,
        profession: resident.profession,
        maritalStatus: resident.maritalStatus,
        children: resident.children,
        agesOfChildren: resident.agesOfChildren,
        liveTogether: resident.liveTogether,
        schooling: resident.schooling,
        healthPlan: resident.healthPlan,
        conditionsAccessTreatedWater: resident.conditionsAccessTreatedWater,
        accessToTreatedWater: resident.accessToTreatedWater,
        accessToSewage: resident.accessToSewage,
      });
      toast.success("Morador cadastrado com sucesso!");

      setResident({
        name: "",
        socialName: "",
        birthDate: "",
        gender: "",
        raceColor: "",
        religion: "",
        birthPlace: "",
        susCard: "",
        phone: "",
        isChild: false,
        class: "",
        responsible: {
          id: "",
          name: "",
        },
        profession: "",
        maritalStatus: "",
        children: 0,
        agesOfChildren: [0],
        liveTogether: false,
        schooling: "",
        healthPlan: "",
        conditionsAccessTreatedWater: "",
        accessToTreatedWater: false,
        accessToSewage: false,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar morador!");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await refetch();
      await refetchApi();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch, refetchApi]);

  return (
    <Default title="Cadastro de morador">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <Heading>Cadastro do Morador</Heading>

        <form
          className="flex w-full flex-col gap-7"
          noValidate
          onSubmit={handleSubmit}
        >
          <Autocomplete
            options={residents}
            renderInput={(params) => (
              <TextField {...params} label="Verificar cadastro" />
            )}
          />

          <TextField
            label="Nome"
            variant="filled"
            value={resident.name}
            onChange={(e) => setResident({ ...resident, name: e.target.value })}
          />

          <TextField
            label="Nome social (caso necessário)"
            variant="filled"
            value={resident.socialName}
            onChange={(e) =>
              setResident({ ...resident, socialName: e.target.value })
            }
          />

          <DateField
            label="Data de nascimento"
            format="dd/MM/yyyy"
            variant="filled"
            value={resident.birthDate}
            onChange={(e) =>
              setResident({ ...resident, birthDate: e as string })
            }
          />

          <div className="flex flex-col gap-1">
            <Text size="lg" asChild>
              <label id="Genero">Qual a sua identidade de gênero</label>
            </Text>

            <Select
              id="Genero"
              label="Gênero"
              variant="filled"
              value={resident.gender}
              onChange={(e) =>
                setResident({ ...resident, gender: e.target.value })
              }
            >
              <MenuItem value="Mulher CIS">Mulher CIS</MenuItem>
              <MenuItem value="Mulher Trans">Mulher Trans</MenuItem>
              <MenuItem value="Homem CIS">Homem CIS</MenuItem>
              <MenuItem value="Homem Trans">Homem Trans</MenuItem>
            </Select>
          </div>

          <TextField
            label="Raça/Cor"
            variant="filled"
            value={resident.raceColor}
            onChange={(e) =>
              setResident({ ...resident, raceColor: e.target.value })
            }
          />

          <TextField
            label="Qual a religião que você segue?"
            variant="filled"
            value={resident.religion}
            onChange={(e) =>
              setResident({ ...resident, religion: e.target.value })
            }
          />

          <TextField
            label="Local de nascimento"
            variant="filled"
            value={resident.birthPlace}
            onChange={(e) =>
              setResident({ ...resident, birthPlace: e.target.value })
            }
          />

          <TextField
            label="Cartão SUS"
            variant="filled"
            value={resident.susCard}
            onChange={(e) =>
              setResident({ ...resident, susCard: e.target.value })
            }
          />

          <TextField
            label="Telefone para contato"
            variant="filled"
            value={resident.phone}
            onChange={(e) =>
              setResident({ ...resident, phone: e.target.value })
            }
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                color="success"
                checked={resident.isChild}
                onChange={(e) =>
                  setResident({ ...resident, isChild: e.target.checked })
                }
              />
            }
            label="É criança?"
          />

          {resident.isChild ? (
            <>
              <TextField
                label="Turma"
                variant="filled"
                value={resident.class}
                onChange={(e) =>
                  setResident({ ...resident, class: e.target.value })
                }
              />

              <Autocomplete
                options={responsibles}
                value={{
                  id: resident.responsible.id,
                  label: resident.responsible.name,
                }}
                onChange={(e, value) =>
                  setResident({
                    ...resident,
                    responsible: {
                      id: value?.id ?? "",
                      name: value?.label ?? "",
                    },
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Nome do responsável" />
                )}
              />
            </>
          ) : (
            <>
              <TextField
                label="Você possui alguma profissão ou atividade remunerada? Se sim qual?"
                variant="filled"
                value={resident.profession}
                onChange={(e) =>
                  setResident({ ...resident, profession: e.target.value })
                }
              />

              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label id="estado-civil">Estado civil</label>
                </Text>

                <Select
                  id="estado-civil"
                  label="Estado civil"
                  variant="filled"
                  value={resident.maritalStatus}
                  onChange={(e) =>
                    setResident({ ...resident, maritalStatus: e.target.value })
                  }
                >
                  <MenuItem value="SOLTEIRO">Solteiro</MenuItem>
                  <MenuItem value="CASADO">Casado</MenuItem>
                  <MenuItem value="SEPARADO">Separado</MenuItem>
                  <MenuItem value="DIVORCIADO">Divorciado</MenuItem>
                  <MenuItem value="VIUVO">Viúvo</MenuItem>
                </Select>
              </div>

              <TextField
                label="Possui filhos? Se sim, quantos?"
                variant="filled"
                type="number"
                value={String(resident.children)}
                onChange={(e) =>
                  setResident({
                    ...resident,
                    children: Number(e.target.value),
                  })
                }
              />

              {resident.children > 0 && (
                <>
                  {Array.from({ length: resident.children }, (_, index) => (
                    <TextField
                      key={index}
                      label={`Qual a idade? ${
                        index === 0 ? "Filho mais velho" : `Filho ${index + 1}`
                      }`}
                      variant="filled"
                      value={String(resident.agesOfChildren[index] ?? 0)}
                      onChange={(e) => {
                        const agesOfChildren = [...resident.agesOfChildren];
                        agesOfChildren[index] = Number(e.target.value);
                        setResident({ ...resident, agesOfChildren });
                      }}
                    />
                  ))}

                  <FormControlLabel
                    control={
                      <Checkbox
                        color="success"
                        checked={resident.liveTogether}
                        onChange={(e) =>
                          setResident({
                            ...resident,
                            liveTogether: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Residem juntos?"
                  />
                </>
              )}

              <div className="flex flex-col gap-1">
                <Text size="lg" asChild>
                  <label id="escolaridade">
                    Qual a sua escolaridade? Até que série você estudou?
                  </label>
                </Text>

                <Select
                  id="escolaridade"
                  label="Escolaridade"
                  variant="filled"
                  value={resident.schooling}
                  onChange={(e) =>
                    setResident({ ...resident, schooling: e.target.value })
                  }
                >
                  <MenuItem value="NAO_ALFABETIZADO">Não Alfabetizado</MenuItem>
                  <MenuItem value="SABE_LER_E_ESCREVER">
                    Sabe ler e escrever
                  </MenuItem>
                  <MenuItem value="FUNDAMENTAL_INCOMPLETO">
                    Ensino Fundamental Incompleto
                  </MenuItem>
                  <MenuItem value="FUNDAMENTAL_COMPLETO">
                    Ensino Fundamental Completo
                  </MenuItem>
                  <MenuItem value="MEDIO_INCOMPLETO">
                    Ensino Médio Incompleto
                  </MenuItem>
                  <MenuItem value="MEDIO_COMPLETO">
                    Ensino Médio Completo
                  </MenuItem>
                  <MenuItem value="SUPERIOR_INCOMPLETO">
                    Ensino Superior Incompleto
                  </MenuItem>
                  <MenuItem value="SUPERIOR_COMPLETO">
                    Ensino Superior Completo
                  </MenuItem>
                  <MenuItem value="POS_GRADUACAO">Pós Graduação</MenuItem>
                  <MenuItem value="MESTRADO">Mestrado</MenuItem>
                  <MenuItem value="DOUTORADO">Doutorado</MenuItem>
                  <MenuItem value="POS_DOUTORADO">Pós Doutorado</MenuItem>
                  <MenuItem value="NAO_SABE_NAO_RESPONDEU">
                    Não sabe/ Não respondeu
                  </MenuItem>
                </Select>
              </div>

              <TextField
                label="Plano de saúde? Se sim, qual?"
                variant="filled"
                value={resident.healthPlan}
                onChange={(e) =>
                  setResident({ ...resident, healthPlan: e.target.value })
                }
              />

              <TextField
                label="Quais as suas condições de acesso à água tratada?"
                variant="filled"
                value={resident.conditionsAccessTreatedWater}
                onChange={(e) =>
                  setResident({
                    ...resident,
                    conditionsAccessTreatedWater: e.target.value,
                  })
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    value={resident.accessToSewage}
                    onChange={(e) =>
                      setResident({
                        ...resident,
                        accessToTreatedWater: e.target.checked,
                      })
                    }
                  />
                }
                label="Tem acesso a água tratada?"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="success"
                    value={resident.accessToSewage}
                    onChange={(e) =>
                      setResident({
                        ...resident,
                        accessToSewage: e.target.checked,
                      })
                    }
                  />
                }
                label="Tem acesso a rede de
                esgoto?"
              />
            </>
          )}

          <Button type="submit" disabled={isLoadingCreateResident}>
            {isLoadingCreateResident ? "Salvando..." : "Salvar"}
          </Button>
          <ToastContainer pauseOnFocusLoss theme="colored" />
        </form>
      </div>
    </Default>
  );
};

export default Resident;
