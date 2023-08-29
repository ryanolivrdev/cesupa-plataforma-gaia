/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Odontogram from "~/components/elements/odontograma/Odontogram";
import { type PersonType } from "./documentsEmission";

const DentalAnamnesis: NextPage = () => {
  const { data: residentsAPI, refetch } = api.resident.getAll.useQuery({});
  const [data, setData] = useState([]);
  const {
    mutateAsync: createDentalAnamnesis,
    isLoading: isLoadingCreateDentalAnamnesis,
  } = api.resident.dentalAnamnesis.useMutation({});

  const [dentalAnamnesis, setDentalAnamnesis] = useState({
    complaint: "",
    isToothache: "",
    isGumPain: "",
    isGumsBleedWhenBrushing: "",
    isUseToothpaste: "",
    isUseDentalFloss: "",
    brushingFrequency: "",
    brushType: "",
    brushChange: "",
    isUsePacifier: "",
    eatingHabits: "",
    isAllergic: "",
    allergy: "",
    dentalTreatmentStatus: "",
    dentalTreatment: "",

    gum: "",
    gumObs: "",
    jugalMucosa: "",
    jugalObs: "",
    palate: "",
    palateObs: "",
    floor: "",
    floorObs: "",
    tongue: "",
    tongueObs: "",
    fluorosis: "",
    fluorosisObs: "",
  });

  const residents = useMemo(() => {
    if (!residentsAPI) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return residentsAPI.map((resident: any) => ({
      ...resident,
      label: resident.name,
    }));
  }, [residentsAPI]);

  const [selectedPerson, setSelectedPerson] = useState<PersonType>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPerson = (event: any, value: PersonType) => {
    setSelectedPerson(value);
  };

  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    try {
      await createDentalAnamnesis({
        ...dentalAnamnesis,
        teeth: data,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");
      setData([]);
      setDentalAnamnesis({
        complaint: "",
        isToothache: "",
        isGumPain: "",
        isGumsBleedWhenBrushing: "",
        isUseToothpaste: "",
        isUseDentalFloss: "",
        brushingFrequency: "",
        brushType: "",
        brushChange: "",
        isUsePacifier: "",
        eatingHabits: "",
        isAllergic: "",
        allergy: "",
        dentalTreatmentStatus: "",
        dentalTreatment: "",

        gum: "",
        gumObs: "",
        jugalMucosa: "",
        jugalObs: "",
        palate: "",
        palateObs: "",
        floor: "",
        floorObs: "",
        tongue: "",
        tongueObs: "",
        fluorosis: "",
        fluorosisObs: "",
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
    <Default title="Anamnese Odontológica">
      <div className="flex w-full flex-col items-center justify-center gap-9 rounded-md bg-white px-4 py-16 shadow-2xl sm:w-[800px]">
        <Heading>Anamnese Odontológica</Heading>

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
            <Text size="lg">1- HISTÓRICO CLÍNICO</Text>
            <TextField
              label="Queixa principal"
              multiline
              rows={4}
              variant="filled"
              value={dentalAnamnesis.complaint}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  complaint: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Dor nos dentes?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isToothache}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isToothache: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Dor na gengiva?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isGumPain}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isGumPain: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Gengiva sangra ao escovar?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isGumsBleedWhenBrushing}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isGumsBleedWhenBrushing: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa fio dental?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isUseToothpaste}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isUseToothpaste: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa creme dental?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isUseDentalFloss}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isUseDentalFloss: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Escovação quantas vezes/dia?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.brushingFrequency}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    brushingFrequency: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="UMA_VEZ"
                  control={<Radio />}
                  label="1 vezes"
                />
                <FormControlLabel
                  value="DUAS_VEZES"
                  control={<Radio />}
                  label="2 vezes"
                />
                <FormControlLabel
                  value="TRES_VEZES_OU_MAIS_VEZES"
                  control={<Radio />}
                  label="3 vezes +"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tipo de escova</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.brushType}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    brushType: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="INDIVIDUAL"
                  control={<Radio />}
                  label="Individual"
                />
                <FormControlLabel
                  value="COLETIVA"
                  control={<Radio />}
                  label="Coletiva"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Troca da escova</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.brushChange}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    brushChange: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="TODO_MES"
                  control={<Radio />}
                  label="Todo mês"
                />
                <FormControlLabel
                  value="DOIS_EM_DOIS_MESES"
                  control={<Radio />}
                  label="2 em 2 meses"
                />
                <FormControlLabel
                  value="TRES_EM_TRES_MESES_OU_MAIS"
                  control={<Radio />}
                  label="3 em 3 meses +"
                />
                <FormControlLabel
                  value="NAO_SABE"
                  control={<Radio />}
                  label="Não sabe"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Usa chupeta?</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isUsePacifier}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isUsePacifier: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="NAO" control={<Radio />} label="Não" />
                <FormControlLabel value="SIM" control={<Radio />} label="Sim" />
              </RadioGroup>
            </div>

            <TextField
              label="Hábitos alimentares"
              multiline
              rows={4}
              variant="filled"
              value={dentalAnamnesis.eatingHabits}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  eatingHabits: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Alergias</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.isAllergic}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    isAllergic: e.target.value,
                  })
                }
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

            {/* RENDERIZAR APENAS QUANDO FOR SIM */}
            {dentalAnamnesis.isAllergic === "SIM" && (
              <TextField
                label="A que?"
                variant="filled"
                value={dentalAnamnesis.allergy}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    allergy: e.target.value,
                  })
                }
              />
            )}

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Tratamento odontológico</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.dentalTreatmentStatus}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    dentalTreatmentStatus: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="CONCLUIDO"
                  control={<Radio />}
                  label="Concluído"
                />
                <FormControlLabel
                  value="PENDENTE"
                  control={<Radio />}
                  label="Pendente"
                />
                <FormControlLabel
                  value="EM_ANDAMENTO"
                  control={<Radio />}
                  label="Em andamento"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.dentalTreatment}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  dentalTreatment: e.target.value,
                })
              }
            />

            <Text size="lg">2- EXAME CLÍNICO</Text>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Gengiva</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.gum}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    gum: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.gumObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  gumObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Mucosa jugal</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.jugalMucosa}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    jugalMucosa: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.jugalObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  jugalObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Palato</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.palate}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    palate: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.palateObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  palateObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Assoalho</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.floor}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    floor: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.floorObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  floorObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Língua</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.tongue}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    tongue: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.tongueObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  tongueObs: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Fluorose</label>
              </Text>

              <RadioGroup
                value={dentalAnamnesis.fluorosis}
                onChange={(e) =>
                  setDentalAnamnesis({
                    ...dentalAnamnesis,
                    fluorosis: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="NORMAL"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="ALTERADA"
                  control={<Radio />}
                  label="Alterada"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={dentalAnamnesis.fluorosisObs}
              onChange={(e) =>
                setDentalAnamnesis({
                  ...dentalAnamnesis,
                  fluorosisObs: e.target.value,
                })
              }
            />

            <Text size="lg">2- ODONTOGRAMA</Text>
            <Odontogram
              tooth={(labelT: any, zoneT: any, idT: any) => {
                // @ts-expect-error - odontograa não tipado corretamente
                setData((oldArray) => [
                  ...oldArray,
                  {
                    label: labelT,
                    zone: zoneT,
                    id: idT,
                  },
                ]);
              }}
              rtooth={(id: any) => {
                setData((current) =>
                  current.filter((obj) => {
                    // @ts-expect-error - odontograa não tipado corretamente
                    return obj.id !== id;
                  })
                );
              }}
            />
            {data.map((obj) => {
              const dataWihoutThis = data.filter((item) => {
                // @ts-expect-error - odontograa não tipado corretamente
                return item.id !== obj.id;
              });

              return (
                // @ts-expect-error - odontograa não tipado corretamente
                <div key={obj.id} className="flex flex-col">
                  {/* @ts-expect-error - odontograa não tipado corretamente */}
                  <Text size="lg">{`${obj.label} - ${obj.zone}`}</Text>
                  <Select
                    variant="filled"
                    onChange={(e) => {
                      // @ts-expect-error - odontograa não tipado corretamente
                      setData(() => [
                        ...dataWihoutThis,
                        {
                          // @ts-expect-error - odontograa não tipado corretamente
                          id: obj.id,
                          // @ts-expect-error - odontograa não tipado corretamente
                          label: obj.label,
                          // @ts-expect-error - odontograa não tipado corretamente
                          zone: obj.zone,

                          observation: e.target.value,
                        },
                      ]);
                    }}
                  >
                    <MenuItem value="CARIADO">CARIADO</MenuItem>
                    <MenuItem value="HÍGIDO">HÍGIDO</MenuItem>
                    <MenuItem value="AUSENTE">AUSENTE</MenuItem>
                    <MenuItem value="RESTAURADO">RESTAURADO</MenuItem>
                    <MenuItem value="MANCHA BRANCA">MANCHA BRANCA</MenuItem>
                  </Select>
                </div>
              );
            })}

            <Button type="submit" disabled={isLoadingCreateDentalAnamnesis}>
              {isLoadingCreateDentalAnamnesis ? (
                <CircularProgress size={24} />
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        )}
        <ToastContainer pauseOnFocusLoss theme="colored" />
      </div>
    </Default>
  );
};

export default DentalAnamnesis;
