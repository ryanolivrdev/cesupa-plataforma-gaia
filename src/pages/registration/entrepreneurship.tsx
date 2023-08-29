/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";

import { Button } from "~/components/elements/Button";
import { Heading } from "~/components/elements/Heading";
import { Default } from "~/components/layouts/Default";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Text } from "~/components/elements/Text";
import { api } from "~/utils/api";

import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { type PersonType } from "./documentsEmission";

const Entrepreneurship: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createEntrepreneurship,
    isLoading: isLoadingCreateEntrepreneurship,
  } = api.resident.entrepreneurship.useMutation({});

  const [selectedPerson, setSelectedPerson] = useState<PersonType>();
  const [entrepreneurshipData, setEntrepreneurshipData] = useState({
    familyincome: "",
    familyincomeOBS: "",
    paidActivity: "",
    paidActivityWhich: "",
    activityUsingRecyclableMaterials: "",
    activityUsingRecyclableMaterialsWhich: "",
    activityUsingRecyclableMaterialsWhere: "",
    craftsCuttingSewingCustomization: "",
    craftsCuttingSewingCustomizationWhich: "",
    investInSellingProduct: "",
    investInSellingProductWhich: "",
    cooperativeAssociation: "",
    cooperativeAssociationWhich: "",
    knowAboutEntrepreneurship: "",
    desireToUndertake: "",
    desireToUndertakeWhich: "",
    opportunitiesToCreateYourOwnBusiness: "",
    profile: "",
    profileOther: "",
    interestInParticipating: "",
    interestInParticipatingWhich: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPerson = (event: any, value: PersonType) => {
    setSelectedPerson(value);
  };

  const residents = useMemo(() => {
    if (!data) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return data.map((resident: any) => ({
      ...resident,
      label: resident.name,
    }));
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      await createEntrepreneurship({
        ...entrepreneurshipData,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });

      toast.success("Registrado com sucesso!");

      setEntrepreneurshipData({
        familyincome: "",
        familyincomeOBS: "",
        paidActivity: "",
        paidActivityWhich: "",
        activityUsingRecyclableMaterials: "",
        activityUsingRecyclableMaterialsWhich: "",
        activityUsingRecyclableMaterialsWhere: "",
        craftsCuttingSewingCustomization: "",
        craftsCuttingSewingCustomizationWhich: "",
        investInSellingProduct: "",
        investInSellingProductWhich: "",
        cooperativeAssociation: "",
        cooperativeAssociationWhich: "",
        knowAboutEntrepreneurship: "",
        desireToUndertake: "",
        desireToUndertakeWhich: "",
        opportunitiesToCreateYourOwnBusiness: "",
        profile: "",
        profileOther: "",
        interestInParticipating: "",
        interestInParticipatingWhich: "",
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
    <Default title="Empreendedorismo">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <Heading>Empreendedorismo</Heading>

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
          <form
            className="flex w-full flex-col gap-7"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Qual a sua renda familiar?</label>
              </Text>

              <RadioGroup
                aria-label="Qual a sua renda familiar?"
                name="Qual a sua renda familiar?"
                value={entrepreneurshipData.familyincome}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    familyincome: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="De 1 a 3 salários mínimos"
                  control={<Radio />}
                  label=" De 1 a 3 salários mínimos"
                />
                <FormControlLabel
                  value="Menos de um salario minimo"
                  control={<Radio />}
                  label=" Menos de um salario minimo"
                />
                <FormControlLabel
                  value="Não sabe/Não soube responder"
                  control={<Radio />}
                  label="Não sabe/Não soube responder"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={entrepreneurshipData.familyincomeOBS}
              onChange={(event) => {
                setEntrepreneurshipData({
                  ...entrepreneurshipData,
                  familyincomeOBS: event.target.value,
                });
              }}
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Você possui alguma atividade remunerada?</label>
              </Text>

              <RadioGroup
                aria-label="Você possui alguma atividade remunerada?"
                name="Você possui alguma atividade remunerada?"
                value={entrepreneurshipData.paidActivity}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    paidActivity: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {/* RENDERIZAR APENAS QUANDO FOR SIM */}
            {entrepreneurshipData.paidActivity === "SIM" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={entrepreneurshipData.paidActivityWhich}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    paidActivityWhich: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você já realizou ou realiza alguma atividade utilizando
                  materiais recicláveis? (garrafa pet, sacolas, ...)
                </label>
              </Text>

              <RadioGroup
                aria-label="Você já realizou ou realiza alguma atividade utilizando materiais recicláveis? (garrafa
                pet, sacolas, ...)"
                name="Você já realizou ou realiza alguma atividade utilizando materiais recicláveis? (garrafa
                pet, sacolas, ...)"
                value={entrepreneurshipData.activityUsingRecyclableMaterials}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    activityUsingRecyclableMaterials: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {/* RENDERIZAR APENAS QUANDO FOR SIM */}
            {entrepreneurshipData.activityUsingRecyclableMaterials ===
              "SIM" && (
              <>
                <TextField
                  label="Quais?"
                  variant="filled"
                  value={
                    entrepreneurshipData.activityUsingRecyclableMaterialsWhich
                  }
                  onChange={(event) => {
                    setEntrepreneurshipData({
                      ...entrepreneurshipData,
                      activityUsingRecyclableMaterialsWhich: event.target.value,
                    });
                  }}
                />

                <TextField
                  label="Onde?"
                  variant="filled"
                  value={
                    entrepreneurshipData.activityUsingRecyclableMaterialsWhere
                  }
                  onChange={(event) => {
                    setEntrepreneurshipData({
                      ...entrepreneurshipData,
                      activityUsingRecyclableMaterialsWhere: event.target.value,
                    });
                  }}
                />
              </>
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você tem interesse em artesanato, corte e costura,
                  personalização?
                </label>
              </Text>

              <RadioGroup
                aria-label="Você tem interesse em artesanato, corte e costura, personalização?"
                name="Você tem interesse em artesanato, corte e costura, personalização?"
                value={entrepreneurshipData.craftsCuttingSewingCustomization}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    craftsCuttingSewingCustomization: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {entrepreneurshipData.craftsCuttingSewingCustomizationWhich ===
              "SIM" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={
                  entrepreneurshipData.craftsCuttingSewingCustomizationWhich
                }
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    craftsCuttingSewingCustomizationWhich: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você já investiu ou investe na venda/comercialização de algum
                  produto? (roupas, sandálias, comida, ...)
                </label>
              </Text>

              <RadioGroup
                aria-label="Você já investiu ou investe na venda/comercialização de algum produto? (roupas,
                sandálias, comida, ...)"
                name="Você já investiu ou investe na venda/comercialização de algum produto? (roupas,
s               andálias, comida, ...)"
                value={entrepreneurshipData.investInSellingProduct}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    investInSellingProduct: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {entrepreneurshipData.investInSellingProduct === "SIM" && (
              <TextField
                label="Quais?"
                variant="filled"
                value={entrepreneurshipData.investInSellingProductWhich}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    investInSellingProductWhich: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você participa de alguma cooperativa e/ou associação?
                </label>
              </Text>

              <RadioGroup
                aria-label="Você participa de alguma cooperativa e/ou associação?"
                name="Você participa de alguma cooperativa e/ou associação?"
                value={entrepreneurshipData.cooperativeAssociation}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    cooperativeAssociation: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {entrepreneurshipData.cooperativeAssociation === "Sim" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={entrepreneurshipData.cooperativeAssociationWhich}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    cooperativeAssociationWhich: event.target.value,
                  });
                }}
              />
            )}

            <TextField
              label="O que você sabe sobre empreendedorismo?"
              variant="filled"
              value={entrepreneurshipData.knowAboutEntrepreneurship}
              onChange={(event) => {
                setEntrepreneurshipData({
                  ...entrepreneurshipData,
                  knowAboutEntrepreneurship: event.target.value,
                });
              }}
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Você possui o desejo de empreender, ter seu próprio
                  negócio/empresa?
                </label>
              </Text>

              <RadioGroup
                aria-label="Você possui o desejo de empreender, ter seu próprio negócio/empresa?"
                name="Você possui o desejo de empreender, ter seu próprio negócio/empresa?"
                value={entrepreneurshipData.desireToUndertake}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    desireToUndertake: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {entrepreneurshipData.desireToUndertake === "SIM" && (
              <TextField
                label="O que?"
                variant="filled"
                value={entrepreneurshipData.desireToUndertakeWhich}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    desireToUndertakeWhich: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Quais são suas oportunidades para criar seu próprio negócio e
                  desenvolver alguma atividade remunerada?
                </label>
              </Text>

              <RadioGroup
                aria-label="Quais são suas oportunidades para criar seu próprio negócio e desenvolver
                alguma atividade remunerada?"
                name="Quais são suas oportunidades para criar seu próprio negócio e desenvolver
                alguma atividade remunerada?"
                value={
                  entrepreneurshipData.opportunitiesToCreateYourOwnBusiness
                }
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    opportunitiesToCreateYourOwnBusiness: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Muito baixa"
                  control={<Radio />}
                  label="Muito baixa"
                />
                <FormControlLabel
                  value="Baixa"
                  control={<Radio />}
                  label="Baixa"
                />
                <FormControlLabel
                  value="Mais ou Menos"
                  control={<Radio />}
                  label="Mais ou Menos"
                />
                <FormControlLabel
                  value="Alta"
                  control={<Radio />}
                  label="Alta"
                />
                <FormControlLabel
                  value="Muito alta"
                  control={<Radio />}
                  label="Muito alta"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Qual das características mais descrevem seu perfil?
                </label>
              </Text>

              <RadioGroup
                aria-label="Qual das características mais descrevem seu perfil"
                name="Qual das características mais descrevem seu perfil"
                value={entrepreneurshipData.profile}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    profile: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Otimista"
                  control={<Radio />}
                  label="Otimista"
                />
                <FormControlLabel
                  value="Persistente"
                  control={<Radio />}
                  label="Persistente"
                />
                <FormControlLabel
                  value="Confiante"
                  control={<Radio />}
                  label="Confiante"
                />
                <FormControlLabel
                  value="Corajoso"
                  control={<Radio />}
                  label="Corajoso"
                />
                <FormControlLabel
                  value="Negativo"
                  control={<Radio />}
                  label="Negativo"
                />
                <FormControlLabel
                  value="Sem paciência"
                  control={<Radio />}
                  label="Sem paciência"
                />
                <FormControlLabel
                  value="Procrastinador"
                  control={<Radio />}
                  label="Procrastinador"
                />
                <FormControlLabel
                  value="Acomodado"
                  control={<Radio />}
                  label="Acomodado"
                />
                <FormControlLabel
                  value="Indisponível"
                  control={<Radio />}
                  label="Indisponível"
                />
                <FormControlLabel
                  value="Outro"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {entrepreneurshipData.profile === "Outro" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={entrepreneurshipData.profileOther}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    profileOther: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>
                  Caso fizéssemos ações de capacitações, você teria interesse em
                  participar? O que você gostaria de aprender?
                </label>
              </Text>

              <RadioGroup
                aria-label="Caso fizéssemos ações de capacitações, você teria interesse em participar? O
                que você gostaria de aprender?"
                name="Caso fizéssemos ações de capacitações, você teria interesse em participar? O
                que você gostaria de aprender?"
                value={entrepreneurshipData.interestInParticipating}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    interestInParticipating: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            {entrepreneurshipData.interestInParticipating === "Sim" && (
              <TextField
                label="O que?"
                variant="filled"
                value={entrepreneurshipData.interestInParticipatingWhich}
                onChange={(event) => {
                  setEntrepreneurshipData({
                    ...entrepreneurshipData,
                    interestInParticipatingWhich: event.target.value,
                  });
                }}
              />
            )}

            <Button type="submit" disabled={isLoadingCreateEntrepreneurship}>
              {isLoadingCreateEntrepreneurship ? "Carregando..." : "Salvar"}
            </Button>
          </form>
        )}
        <ToastContainer pauseOnFocusLoss theme="colored" />
      </div>
    </Default>
  );
};

export default Entrepreneurship;
