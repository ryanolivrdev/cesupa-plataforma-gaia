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

const PhysiotherapyAnamnesis: NextPage = () => {
  const { data, refetch } = api.resident.getAll.useQuery({});
  const {
    mutateAsync: createPhysiotherapyAnamnesis,
    isLoading: isLoadingCreatePsychologicalAnamnesis,
  } = api.resident.physiotherapyAnamnesis.useMutation({});

  const [physiotherapyAnamnesis, setPhysiotherapyAnamnesis] = useState({
    complaintMain: "",
    complaintSecondary: "",
    hda: "",
    medicinesUse: "",
    personalBackground: "",
    painAssessment: "",
    painAssessmentIntensity: "",
    painLocation: "",
    painIntensity: "",
    painFrequency: "",
    painFeature: "",
    specificInspection: "",
    specificInspectionObs: "",
    weight: "",
    height: "",
    pa: "",
    fc: "",
    fr: "",
    ap: "",

    posturalEvaluation: "",
    posturalEvaluationObs: "",

    thinFeel: "",
    fineStop: "",
    movementRestriction: "",
    perception: "",

    // 12
    jointMovement1: "",
    preserved1E: "",
    preserved1D: "",
    diminished1E: "",
    diminished1D: "",

    jointMovement2: "",
    preserved2E: "",
    preserved2D: "",
    diminished2E: "",
    diminished2D: "",

    jointMovement3: "",
    preserved3E: "",
    preserved3D: "",
    diminished3E: "",
    diminished3D: "",

    jointMovement4: "",
    preserved4E: "",
    preserved4D: "",
    diminished4E: "",
    diminished4D: "",

    jointMovement5: "",
    preserved5E: "",
    preserved5D: "",
    diminished5E: "",
    diminished5D: "",

    jointMovement6: "",
    preserved6E: "",
    preserved6D: "",
    diminished6E: "",
    diminished6D: "",

    jointMovement7: "",
    preserved7E: "",
    preserved7D: "",
    diminished7E: "",
    diminished7D: "",

    jointMovement8: "",
    preserved8E: "",
    preserved8D: "",
    diminished8E: "",
    diminished8D: "",

    jointMovement9: "",
    preserved9E: "",
    preserved9D: "",
    diminished9E: "",
    diminished9D: "",

    jointMovement10: "",
    preserved10E: "",
    preserved10D: "",
    diminished10E: "",
    diminished10D: "",

    jointMovement11: "",
    preserved11E: "",
    preserved11D: "",
    diminished11E: "",
    diminished11D: "",

    jointMovement12: "",
    preserved12E: "",
    preserved12D: "",
    diminished12E: "",
    diminished12D: "",

    memberTested1: "",
    degreeOfStrength1: "",
    memberTested2: "",
    degreeOfStrength2: "",
    memberTested3: "",
    degreeOfStrength3: "",
    memberTested4: "",
    degreeOfStrength4: "",
    memberTested5: "",
    degreeOfStrength5: "",

    generalObservation: "",
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
      await createPhysiotherapyAnamnesis({
        ...physiotherapyAnamnesis,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: selectedPerson!.id,
      });
      toast.success("Registrado com sucesso!");

      setPhysiotherapyAnamnesis({
        complaintMain: "",
        complaintSecondary: "",
        hda: "",
        medicinesUse: "",
        personalBackground: "",
        painAssessment: "",
        painAssessmentIntensity: "",
        painLocation: "",
        painIntensity: "",
        painFrequency: "",
        painFeature: "",
        specificInspection: "",
        specificInspectionObs: "",
        weight: "",
        height: "",
        pa: "",
        fc: "",
        fr: "",
        ap: "",

        posturalEvaluation: "",
        posturalEvaluationObs: "",

        thinFeel: "",
        fineStop: "",
        movementRestriction: "",
        perception: "",

        // 12
        jointMovement1: "",
        preserved1E: "",
        preserved1D: "",
        diminished1E: "",
        diminished1D: "",

        jointMovement2: "",
        preserved2E: "",
        preserved2D: "",
        diminished2E: "",
        diminished2D: "",

        jointMovement3: "",
        preserved3E: "",
        preserved3D: "",
        diminished3E: "",
        diminished3D: "",

        jointMovement4: "",
        preserved4E: "",
        preserved4D: "",
        diminished4E: "",
        diminished4D: "",

        jointMovement5: "",
        preserved5E: "",
        preserved5D: "",
        diminished5E: "",
        diminished5D: "",

        jointMovement6: "",
        preserved6E: "",
        preserved6D: "",
        diminished6E: "",
        diminished6D: "",

        jointMovement7: "",
        preserved7E: "",
        preserved7D: "",
        diminished7E: "",
        diminished7D: "",

        jointMovement8: "",
        preserved8E: "",
        preserved8D: "",
        diminished8E: "",
        diminished8D: "",

        jointMovement9: "",
        preserved9E: "",
        preserved9D: "",
        diminished9E: "",
        diminished9D: "",

        jointMovement10: "",
        preserved10E: "",
        preserved10D: "",
        diminished10E: "",
        diminished10D: "",

        jointMovement11: "",
        preserved11E: "",
        preserved11D: "",
        diminished11E: "",
        diminished11D: "",

        jointMovement12: "",
        preserved12E: "",
        preserved12D: "",
        diminished12E: "",
        diminished12D: "",

        memberTested1: "",
        degreeOfStrength1: "",
        memberTested2: "",
        degreeOfStrength2: "",
        memberTested3: "",
        degreeOfStrength3: "",
        memberTested4: "",
        degreeOfStrength4: "",
        memberTested5: "",
        degreeOfStrength5: "",

        generalObservation: "",
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
        <Heading>Anamnese Fisioterapia</Heading>

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
            <TextField
              label="Queixa principal"
              multiline
              rows={4}
              variant="filled"
              value={physiotherapyAnamnesis.complaintMain}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  complaintMain: e.target.value,
                })
              }
            />

            <TextField
              label="Queixa funcional"
              multiline
              rows={4}
              variant="filled"
              value={physiotherapyAnamnesis.complaintSecondary}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  complaintSecondary: e.target.value,
                })
              }
            />

            <TextField
              label="HDA"
              multiline
              rows={5}
              variant="filled"
              value={physiotherapyAnamnesis.hda}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  hda: e.target.value,
                })
              }
            />

            <TextField
              label="Medicamentos em uso"
              variant="filled"
              value={physiotherapyAnamnesis.medicinesUse}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  medicinesUse: e.target.value,
                })
              }
            />

            <TextField
              label="Antecedentes pessoais"
              variant="filled"
              value={physiotherapyAnamnesis.personalBackground}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  personalBackground: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>AVALIAÇÃO DA DOR</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.painAssessment}
                onChange={(event) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    painAssessment: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="REPOUSO"
                  control={<Radio />}
                  label="Repouso"
                />
                <FormControlLabel
                  value="MOVIMENTO"
                  control={<Radio />}
                  label="Movimento"
                />
                <FormControlLabel
                  value="PALPAÇÃO"
                  control={<Radio />}
                  label="Palpação"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Avalie de 0 à 10</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.painAssessmentIntensity}
                onChange={(event) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    painAssessmentIntensity: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel value="7" control={<Radio />} label="7" />
                <FormControlLabel value="8" control={<Radio />} label="8" />
                <FormControlLabel value="9" control={<Radio />} label="9" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
              </RadioGroup>
            </div>

            <TextField
              label="Localização da dor"
              variant="filled"
              value={physiotherapyAnamnesis.painLocation}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  painLocation: e.target.value,
                })
              }
            />

            <TextField
              label="Freqüência da dor"
              variant="filled"
              value={physiotherapyAnamnesis.painFrequency}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  painFrequency: e.target.value,
                })
              }
            />

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Característica</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.painFeature}
                onChange={(event) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    painFeature: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Pulsátil"
                  control={<Radio />}
                  label="Pulsátil"
                />
                <FormControlLabel
                  value="Em peso"
                  control={<Radio />}
                  label="Em peso"
                />
                <FormControlLabel
                  value="Latejante"
                  control={<Radio />}
                  label="Latejante"
                />
                <FormControlLabel
                  value="Queimação"
                  control={<Radio />}
                  label="Queimação"
                />
                <FormControlLabel
                  value="Profunda"
                  control={<Radio />}
                  label="Profunda"
                />
                <FormControlLabel
                  value="Em pressão"
                  control={<Radio />}
                  label="Em pressão"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Interfere</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.painIntensity}
                onChange={(event) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    painIntensity: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Ativ. diárias"
                  control={<Radio />}
                  label="Ativ. diárias"
                />
                <FormControlLabel
                  value="Exercício"
                  control={<Radio />}
                  label="Exercício"
                />
                <FormControlLabel
                  value="Humor"
                  control={<Radio />}
                  label="Humor"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Inspeção específica</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.specificInspection}
                onChange={(event) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    specificInspection: event.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Edema"
                  control={<Radio />}
                  label="Edema"
                />
                <FormControlLabel
                  value="Rubor"
                  control={<Radio />}
                  label="Rubor"
                />
                <FormControlLabel
                  value="Hematomas"
                  control={<Radio />}
                  label="Hematomas"
                />
                <FormControlLabel
                  value="Manchas"
                  control={<Radio />}
                  label="Manchas"
                />
              </RadioGroup>
            </div>

            <TextField
              label="OBS"
              variant="filled"
              value={physiotherapyAnamnesis.specificInspectionObs}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  specificInspectionObs: e.target.value,
                })
              }
            />

            <Text size="lg">Sinais vitais</Text>

            <TextField
              label="Peso"
              variant="filled"
              value={physiotherapyAnamnesis.weight}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  weight: e.target.value,
                })
              }
            />

            <TextField
              label="Altura"
              variant="filled"
              value={physiotherapyAnamnesis.height}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  height: e.target.value,
                })
              }
            />

            <TextField
              label="PA"
              variant="filled"
              value={physiotherapyAnamnesis.pa}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  pa: e.target.value,
                })
              }
            />

            <TextField
              label="FC"
              variant="filled"
              value={physiotherapyAnamnesis.fc}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  fc: e.target.value,
                })
              }
            />

            <TextField
              label="FR"
              variant="filled"
              value={physiotherapyAnamnesis.fr}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  fr: e.target.value,
                })
              }
            />

            <TextField
              label="AP"
              variant="filled"
              value={physiotherapyAnamnesis.ap}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  ap: e.target.value,
                })
              }
            />

            {/* AVALIACAO POSTURAL */}
            <Text size="lg">Avaliação postural</Text>
            <img
              src="/static/images/pipoca.png"
              alt=""
              className="h-auto w-full"
            />
            <TextField
              label="Pontue se tiver elevação ex: Cabeça"
              variant="filled"
              value={physiotherapyAnamnesis.posturalEvaluation}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  posturalEvaluation: e.target.value,
                })
              }
            />

            <TextField
              label="OBS"
              variant="filled"
              value={physiotherapyAnamnesis.posturalEvaluationObs}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  posturalEvaluationObs: e.target.value,
                })
              }
            />

            <Text size="lg">Análise da função articular</Text>
            <Text size="sm">Passiva</Text>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Sensação final</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.thinFeel}
                onChange={(e) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    thinFeel: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Patológica"
                  control={<Radio />}
                  label="Patológica"
                />
                <FormControlLabel
                  value="Normal"
                  control={<Radio />}
                  label="Normal"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Parada final</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.fineStop}
                onChange={(e) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    fineStop: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel value="Dor" control={<Radio />} label="Dor" />
                <FormControlLabel
                  value="Sem dor"
                  control={<Radio />}
                  label="Sem dor"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Restrição do movimento</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.movementRestriction}
                onChange={(e) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    movementRestriction: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Elástica"
                  control={<Radio />}
                  label="Elástica"
                />
                <FormControlLabel
                  value="Rígida"
                  control={<Radio />}
                  label="Rígida"
                />
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1">
              <Text size="lg" asChild>
                <label>Percepção</label>
              </Text>

              <RadioGroup
                value={physiotherapyAnamnesis.perception}
                onChange={(e) =>
                  setPhysiotherapyAnamnesis({
                    ...physiotherapyAnamnesis,
                    perception: e.target.value,
                  })
                }
                row
              >
                <FormControlLabel
                  value="Crepitação"
                  control={<Radio />}
                  label="Crepitação"
                />
                <FormControlLabel
                  value="Assimetria"
                  control={<Radio />}
                  label="Assimetria"
                />
              </RadioGroup>
            </div>

            <Text size="sm">Ativa</Text>
            <div className="w-full overflow-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-center">
                    <th rowSpan={2}>Movimento articular</th>
                    <th colSpan={2}>Preservado</th>
                    <th colSpan={2}>Diminuído</th>
                  </tr>
                  <tr>
                    <th className="w-32 text-center">E</th>
                    <th className="w-32 text-center">D</th>
                    <th className="w-32 text-center">E</th>
                    <th className="w-32 text-center">D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement1}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement1: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved1E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved1E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved1D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved1D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished1E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished1E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished1D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished1D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement2}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement2: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved2E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved2E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved2D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved2D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished2E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished2E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished2D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished2D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement3}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement3: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved3E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved3E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved3D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved3D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished3E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished3E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished3D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished3D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement4}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement4: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved4E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved4E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved4D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved4D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished4E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished4E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished4D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished4D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement5}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement5: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved5E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved5E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved5D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved5D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished5E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished5E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished5D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished5D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement6}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement6: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved6E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved6E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved6D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved6D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished6E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished6E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished6D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished6D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement7}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement7: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved7E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved7E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved7D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved7D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished7E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished7E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished7D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished7D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement8}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement8: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved8E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved8E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved8D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved8D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished8E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished8E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished8D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished8D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement9}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement9: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved9E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved9E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved9D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved9D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished9E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished9E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished9D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished9D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement10}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement10: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved10E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved10E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved10D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved10D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished10E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished10E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished10D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished10D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement11}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement11: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved11E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved11E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved11D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved11D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished11E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished11E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished11D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished11D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.jointMovement12}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            jointMovement12: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved12E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved12E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.preserved12D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            preserved12D: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished12E}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished12E: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.diminished12D}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            diminished12D: e.target.value,
                          })
                        }
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <Text size="lg">Análise da função muscular</Text>

            <div className="w-full overflow-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-center">
                    <th>Movimento(s)/Músculo(s) testado(s)</th>
                    <th>Grau da força</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.memberTested1}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            memberTested1: e.target.value,
                          })
                        }
                      />
                    </th>

                    <th>
                      <RadioGroup
                        value={physiotherapyAnamnesis.degreeOfStrength1}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            degreeOfStrength1: e.target.value,
                          })
                        }
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="0"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                        />
                      </RadioGroup>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.memberTested2}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            memberTested2: e.target.value,
                          })
                        }
                      />
                    </th>

                    <th>
                      <RadioGroup
                        value={physiotherapyAnamnesis.degreeOfStrength2}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            degreeOfStrength2: e.target.value,
                          })
                        }
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="0"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                        />
                      </RadioGroup>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.memberTested3}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            memberTested3: e.target.value,
                          })
                        }
                      />
                    </th>

                    <th>
                      <RadioGroup
                        value={physiotherapyAnamnesis.degreeOfStrength3}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            degreeOfStrength3: e.target.value,
                          })
                        }
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="0"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                        />
                      </RadioGroup>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.memberTested4}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            memberTested4: e.target.value,
                          })
                        }
                      />
                    </th>

                    <th>
                      <RadioGroup
                        value={physiotherapyAnamnesis.degreeOfStrength4}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            degreeOfStrength4: e.target.value,
                          })
                        }
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="0"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                        />
                      </RadioGroup>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <TextField
                        label=""
                        variant="filled"
                        value={physiotherapyAnamnesis.memberTested5}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            memberTested5: e.target.value,
                          })
                        }
                      />
                    </th>

                    <th>
                      <RadioGroup
                        value={physiotherapyAnamnesis.degreeOfStrength5}
                        onChange={(e) =>
                          setPhysiotherapyAnamnesis({
                            ...physiotherapyAnamnesis,
                            degreeOfStrength5: e.target.value,
                          })
                        }
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="0"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="1"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="2"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="3"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="4"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="5"
                        />
                      </RadioGroup>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>

            <TextField
              label="Observações gerais"
              variant="filled"
              multiline
              rows={4}
              value={physiotherapyAnamnesis.generalObservation}
              onChange={(e) =>
                setPhysiotherapyAnamnesis({
                  ...physiotherapyAnamnesis,
                  generalObservation: e.target.value,
                })
              }
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

export default PhysiotherapyAnamnesis;
