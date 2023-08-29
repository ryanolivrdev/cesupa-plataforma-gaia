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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { type PersonType } from "./documentsEmission";

const MedicalAnamnesis: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createMedicalAnamnesis,
    isLoading: isLoadingCreateMedicalAnamnesis,
  } = api.resident.medicalAnamnesis.useMutation({});

  const [selectedPerson, setSelectedPerson] = useState<PersonType>();

  const [medicalAnamnesis, setMedicalAnamnesis] = useState({
    bloodType: "",
    priorIllness: "",
    priorIllnessOther: "",
    previousHospitalizations: "",
    reasonForPreviousHospitalizations: "",
    previousSurgeries: "",
    reasonForPreviousSurgeries: "",
    injuries: "",
    allergies: "",
    allergy: "",
    familyDiseases: "",
    familyDiseasesOther: "",
    physicalActivity: "",
    smoking: "",
    smokingOf: "",
    etilismo: "",
    vaccineScheduleUpdate: "",
    typeOfHouse: "",
    typeOfHouseOther: "",
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
      const _priorIllnessOther =
        medicalAnamnesis.priorIllness === "OUTRO"
          ? medicalAnamnesis.priorIllnessOther
          : medicalAnamnesis.priorIllness;
      const _typeOfHouseOther =
        medicalAnamnesis.typeOfHouse === "Outro"
          ? medicalAnamnesis.typeOfHouseOther
          : medicalAnamnesis.typeOfHouse;
      const _familyDiseases =
        medicalAnamnesis.familyDiseases === "OUTRO"
          ? medicalAnamnesis.familyDiseasesOther
          : medicalAnamnesis.familyDiseases;

      await createMedicalAnamnesis({
        priorIllness: _priorIllnessOther,
        typeOfHouse: _typeOfHouseOther,
        familyDiseases: _familyDiseases,

        bloodType: medicalAnamnesis.bloodType,
        previousHospitalizations: medicalAnamnesis.previousHospitalizations,
        reasonForPreviousSurgeries: medicalAnamnesis.reasonForPreviousSurgeries,
        reasonForPreviousHospitalizations:
          medicalAnamnesis.reasonForPreviousHospitalizations,
        previousSurgeries: medicalAnamnesis.previousSurgeries,
        injuries: medicalAnamnesis.injuries,
        allergies: medicalAnamnesis.allergies,
        allergy: medicalAnamnesis.allergy,
        physicalActivity: medicalAnamnesis.physicalActivity,
        smoking: medicalAnamnesis.smoking,
        smokingOf: medicalAnamnesis.smokingOf,
        etilismo: medicalAnamnesis.etilismo,
        vaccineScheduleUpdate: medicalAnamnesis.vaccineScheduleUpdate,

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setMedicalAnamnesis({
        bloodType: "",
        priorIllness: "",
        priorIllnessOther: "",
        previousHospitalizations: "",
        reasonForPreviousHospitalizations: "",
        previousSurgeries: "",
        reasonForPreviousSurgeries: "",
        injuries: "",
        allergies: "",
        allergy: "",
        familyDiseases: "",
        familyDiseasesOther: "",
        physicalActivity: "",
        smoking: "",
        smokingOf: "",
        etilismo: "",
        vaccineScheduleUpdate: "",
        typeOfHouse: "",
        typeOfHouseOther: "",
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
    <Default title="Anamnese Médica">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[600px]">
        <Heading>Anamnese Médica</Heading>

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
                <label>Tipo sanguíneo</label>
              </Text>

              <Select
                label="Tipo sanguíneo"
                variant="filled"
                value={medicalAnamnesis.bloodType}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    bloodType: event.target.value,
                  });
                }}
              >
                <MenuItem value="A_POSITIVO">A+</MenuItem>
                <MenuItem value="A_NEGATIVO">A- </MenuItem>
                <MenuItem value="B_POSITIVO">B+</MenuItem>
                <MenuItem value="B_NEGATIVO">B- </MenuItem>
                <MenuItem value="AB_POSITIVO">AB+</MenuItem>
                <MenuItem value="AB_NEGATIVO">AB- </MenuItem>
                <MenuItem value="O_POSITIVO">O+</MenuItem>
                <MenuItem value="O_NEGATIVO">O- </MenuItem>
                <MenuItem value="NAO_SABE">Não sabe</MenuItem>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Doença prévia</label>
              </Text>

              <RadioGroup
                aria-label="Doença prévia"
                name="Doença prévia"
                value={medicalAnamnesis.priorIllness}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    priorIllness: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Hipertensão arterial sistêmica"
                  control={<Radio />}
                  label="Hipertensão arterial sistêmica"
                />
                <FormControlLabel
                  value="Diabetes Mellitus"
                  control={<Radio />}
                  label="Diabetes Mellitus"
                />
                <FormControlLabel
                  value="Dislipidemia"
                  control={<Radio />}
                  label="Dislipidemia"
                />
                <FormControlLabel
                  value="Câncer"
                  control={<Radio />}
                  label="Câncer"
                />
                <FormControlLabel
                  value="OUTRO"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>
            {medicalAnamnesis.priorIllness === "OUTRO" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={medicalAnamnesis.priorIllnessOther}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    priorIllnessOther: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Internações prévias</label>
              </Text>

              <RadioGroup
                aria-label="Internações prévias"
                name="Internações prévias"
                value={medicalAnamnesis.previousHospitalizations}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    previousHospitalizations: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {medicalAnamnesis.previousHospitalizations === "SIM" && (
              <TextField
                label="Motivo?"
                variant="filled"
                value={medicalAnamnesis.reasonForPreviousHospitalizations}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    reasonForPreviousHospitalizations: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Cirurgias prévias</label>
              </Text>

              <RadioGroup
                aria-label="Cirurgias prévias"
                name="Cirurgias prévias"
                value={medicalAnamnesis.previousSurgeries}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    previousSurgeries: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {medicalAnamnesis.previousSurgeries === "SIM" && (
              <TextField
                label="Motivo?"
                variant="filled"
                value={medicalAnamnesis.reasonForPreviousSurgeries}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    reasonForPreviousSurgeries: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Traumatismos</label>
              </Text>

              <RadioGroup
                aria-label="Traumatismos"
                name="Traumatismos"
                value={medicalAnamnesis.injuries}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    injuries: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Alergias</label>
              </Text>

              <RadioGroup
                aria-label="Alergias"
                name="Alergias"
                value={medicalAnamnesis.allergies}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    allergies: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel
                  value="NAO_SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            {medicalAnamnesis.allergies === "SIM" && (
              <TextField
                label="A que?"
                variant="filled"
                value={medicalAnamnesis.allergy}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    allergy: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Doenças familiares:</label>
              </Text>

              <RadioGroup
                aria-label="Doenças familiares"
                name="Doenças familiares"
                value={medicalAnamnesis.familyDiseases}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    familyDiseases: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Hipertensão arterial sistêmica"
                  control={<Radio />}
                  label="Hipertensão arterial sistêmica"
                />
                <FormControlLabel
                  value="Diabetes Mellitus"
                  control={<Radio />}
                  label="Diabetes Mellitus"
                />
                <FormControlLabel
                  value="Dislipidemia"
                  control={<Radio />}
                  label="Dislipidemia"
                />
                <FormControlLabel
                  value="Câncer"
                  control={<Radio />}
                  label="Câncer"
                />
                <FormControlLabel
                  value="OUTRO"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {medicalAnamnesis.familyDiseases === "OUTRO" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={medicalAnamnesis.familyDiseasesOther}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    familyDiseasesOther: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Atividade física</label>
              </Text>

              <RadioGroup
                aria-label="Atividade física"
                name="Atividade física"
                value={medicalAnamnesis.physicalActivity}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    physicalActivity: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="SEDENTARIO"
                  control={<Radio />}
                  label="Sedentário"
                />
                <FormControlLabel
                  value="NAO_SEDENTARIO"
                  control={<Radio />}
                  label="Não sedentário"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tabagismo</label>
              </Text>

              <RadioGroup
                aria-label="Tabagismo"
                name="Tabagismo"
                value={medicalAnamnesis.smoking}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    smoking: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            {medicalAnamnesis.smoking === "SIM" && (
              <TextField
                label="Qual? (Cigarro, maconha,
tabaco...)"
                variant="filled"
                value={medicalAnamnesis.smokingOf}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    smokingOf: event.target.value,
                  });
                }}
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Etilismo</label>
              </Text>

              <RadioGroup
                aria-label="Etilismo"
                name="Etilismo"
                value={medicalAnamnesis.etilismo}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    etilismo: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>

            <TextField
              label="Atualização do calendário vacinal"
              variant="filled"
              value={medicalAnamnesis.vaccineScheduleUpdate}
              onChange={(event) => {
                setMedicalAnamnesis({
                  ...medicalAnamnesis,
                  vaccineScheduleUpdate: event.target.value,
                });
              }}
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tipo de casa</label>
              </Text>

              <RadioGroup
                aria-label="Tipo de casa"
                name="Tipo de casa"
                value={medicalAnamnesis.typeOfHouse}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    typeOfHouse: event.target.value,
                  });
                }}
                row
              >
                <FormControlLabel
                  value="Alvenaria"
                  control={<Radio />}
                  label="Alvenaria"
                />
                <FormControlLabel
                  value="Madeira"
                  control={<Radio />}
                  label="Madeira"
                />
                <FormControlLabel
                  value="Palafita"
                  control={<Radio />}
                  label="Palafita"
                />
                <FormControlLabel
                  value="Pau a pique/taipa"
                  control={<Radio />}
                  label="Pau a pique/taipa"
                />
                <FormControlLabel
                  value="Outro"
                  control={<Radio />}
                  label="Outro"
                />
              </RadioGroup>
            </div>

            {medicalAnamnesis.typeOfHouse === "Outro" && (
              <TextField
                label="Qual?"
                variant="filled"
                value={medicalAnamnesis.typeOfHouseOther}
                onChange={(event) => {
                  setMedicalAnamnesis({
                    ...medicalAnamnesis,
                    typeOfHouseOther: event.target.value,
                  });
                }}
              />
            )}

            <Button type="submit" disabled={isLoadingCreateMedicalAnamnesis}>
              {isLoadingCreateMedicalAnamnesis ? "Carregando..." : "Salvar"}
            </Button>
          </form>
        )}
        <ToastContainer pauseOnFocusLoss theme="colored" />
      </div>
    </Default>
  );
};

export default MedicalAnamnesis;
