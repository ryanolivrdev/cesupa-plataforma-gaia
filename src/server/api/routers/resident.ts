/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createWriteStream } from "fs";
import { Workbook, Worksheet } from "exceljs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Readable } from "stream";
import { join } from "path";

export const residentRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.person.findMany();
  }),

  getResponsible: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.person.findMany({
      where: {
        isChild: false,
      },
    });
  }),

  getChildren: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.person.findMany({
      where: {
        isChild: true,
      },
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.person.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  registerGeneral: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        name: z.string(),
        socialName: z.optional(z.string()),
        birthDate: z.optional(z.date()),
        gender: z.optional(z.string()),
        raceColor: z.optional(z.string()),
        religion: z.optional(z.string()),
        birthPlace: z.optional(z.string()),
        susCard: z.optional(z.string()),
        phone: z.optional(z.string()),
        isChild: z.optional(z.boolean()),
        class: z.optional(z.string()),
        responsibleId: z.optional(z.string()),
        profession: z.optional(z.string()),
        maritalStatus: z.optional(z.string()),
        children: z.optional(z.number()),
        agesOfChildren: z.optional(z.array(z.number())),
        liveTogether: z.optional(z.boolean()),
        schooling: z.optional(z.string()),
        healthPlan: z.optional(z.string()),
        conditionsAccessTreatedWater: z.optional(z.string()),
        accessToTreatedWater: z.optional(z.boolean()),
        accessToSewage: z.optional(z.boolean()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.person.upsert({
        where: {
          id: input.id ? input.id : "0",
        },
        create: {
          name: input.name,
          socialName: input.socialName,
          birthDate: input.birthDate,
          gender: input.gender,
          raceColor: input.raceColor,
          religion: input.religion,
          Birthplace: input.birthPlace,
          susCard: input.susCard,
          phone: input.phone,
          isChild: input.isChild,
          class: input.class,
          responsibleId: input.responsibleId ? input.responsibleId : undefined,
          profession: input.profession,
          maritalStatus: input.maritalStatus,
          children: input.children,
          agesOfChildren: input.agesOfChildren,
          liveTogether: input.liveTogether,
          schooling: input.schooling,
          healthPlan: input.healthPlan,
          conditionsAccessTreatedWater: input.conditionsAccessTreatedWater,
          accessToTreatedWater: input.accessToTreatedWater,
          accessToSewage: input.accessToSewage,
        },
        update: {
          name: input.name,
          socialName: input.socialName,
          birthDate: input.birthDate,
          gender: input.gender,
          raceColor: input.raceColor,
          religion: input.religion,
          Birthplace: input.birthPlace,
          susCard: input.susCard,
          phone: input.phone,
          isChild: input.isChild,
          class: input.class,
          responsibleId: input.responsibleId,
          profession: input.profession,
          maritalStatus: input.maritalStatus,
          children: input.children,
          agesOfChildren: input.agesOfChildren,
          liveTogether: input.liveTogether,
          schooling: input.schooling,
          healthPlan: input.healthPlan,
          conditionsAccessTreatedWater: input.conditionsAccessTreatedWater,
          accessToTreatedWater: input.accessToTreatedWater,
          accessToSewage: input.accessToSewage,
        },
      });
    }),

  documentsEmission: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        userId: z.string(),
        isLiveInTheCommunity: z.optional(z.boolean()),
        isHaveBirthCertificate: z.optional(z.boolean()),
        BirthCertificateObs: z.optional(z.string()),
        isHaveRg: z.optional(z.boolean()),
        rgNumber: z.optional(z.string()),
        isHaveCpf: z.optional(z.boolean()),
        cpfNumber: z.optional(z.string()),
        doesNotHaveCpfandRg: z.optional(z.boolean()),
        dontHaveRgCpfObs: z.optional(z.string()),
        lostDocument: z.optional(z.boolean()),
        isHaveElectedTitle: z.optional(z.boolean()),
        isHaveCTPS: z.optional(z.boolean()),
        whichWayIsNeeded: z.optional(z.string()),
        isHaveVaccinationCard: z.optional(z.boolean()),
        pendingDocuments: z.optional(z.string()),
        other: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.documentsEmission.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,
          isLiveInTheCommunity: input.isLiveInTheCommunity,
          isHaveBirthCertificate: input.isHaveBirthCertificate,
          BirthCertificateObs: input.BirthCertificateObs,
          isHaveRg: input.isHaveRg,
          rgNumber: input.rgNumber,
          isHaveCpf: input.isHaveCpf,
          cpfNumber: input.cpfNumber,
          doesNotHaveCpfandRg: input.doesNotHaveCpfandRg,
          dontHaveRgCpfObs: input.dontHaveRgCpfObs,
          lostDocument: input.lostDocument,
          isHaveElectedTitle: input.isHaveElectedTitle,
          isHaveCTPS: input.isHaveCTPS,
          whichWayIsNeeded: input.whichWayIsNeeded,
          isHaveVaccinationCard: input.isHaveVaccinationCard,
          pendingDocuments: input.pendingDocuments,
          other: input.other,
        },
        update: {
          isLiveInTheCommunity: input.isLiveInTheCommunity,
          isHaveBirthCertificate: input.isHaveBirthCertificate,
          BirthCertificateObs: input.BirthCertificateObs,
          isHaveRg: input.isHaveRg,
          rgNumber: input.rgNumber,
          isHaveCpf: input.isHaveCpf,
          cpfNumber: input.cpfNumber,
          doesNotHaveCpfandRg: input.doesNotHaveCpfandRg,
          dontHaveRgCpfObs: input.dontHaveRgCpfObs,
          lostDocument: input.lostDocument,
          isHaveElectedTitle: input.isHaveElectedTitle,
          isHaveCTPS: input.isHaveCTPS,
          whichWayIsNeeded: input.whichWayIsNeeded,
          isHaveVaccinationCard: input.isHaveVaccinationCard,
          pendingDocuments: input.pendingDocuments,
        },
      });
    }),

  psychologicalAnamnesis: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        feeling: z.optional(z.string()),
        opportunitiesLeisure: z.optional(z.string()),
        sleepQuality: z.optional(z.string()),
        isPerformsPhysicalActivity: z.optional(z.string()),
        physicalActivities: z.optional(z.string()),
        selfCare: z.optional(z.string()),
        typesOfThinking: z.optional(z.string()),
        haveSupportPeople: z.optional(z.string()),
        supportPeople: z.optional(z.string()),

        doesPsychologicalFollowUp: z.optional(z.string()),
        doesPsychiatricFollowUp: z.optional(z.string()),
        isUseMedication: z.optional(z.string()),
        wouldSeekHelp: z.optional(z.string()),
        observation: z.optional(z.string()),
        guidance: z.optional(z.string()),
        whatCanWeOffer: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.psychologicalAnamnesis.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,

          // : input.feeling,
          feeling: input.feeling,
          opportunitiesLeisure: input.opportunitiesLeisure,
          sleepQuality: input.sleepQuality,

          isPerformsPhysicalActivity: input.isPerformsPhysicalActivity,
          physicalActivities: input.physicalActivities,
          selfCare: input.selfCare,
          typesOfThinking: input.typesOfThinking,
          haveSupportPeople: input.haveSupportPeople,
          supportPeople: input.supportPeople,

          doesPsychologicalFollowUp: input.doesPsychologicalFollowUp,
          doesPsychiatricFollowUp: input.doesPsychiatricFollowUp,

          isUseMedication: input.isUseMedication,
          wouldSeekHelp: input.wouldSeekHelp,

          observation: input.observation,

          guidance: input.guidance,
          whatCanWeOffer: input.whatCanWeOffer,
        },
        update: {
          feeling: input.feeling,
          opportunitiesLeisure: input.opportunitiesLeisure,
          sleepQuality: input.sleepQuality,

          isPerformsPhysicalActivity: input.isPerformsPhysicalActivity,
          physicalActivities: input.physicalActivities,
          selfCare: input.selfCare,
          typesOfThinking: input.typesOfThinking,
          haveSupportPeople: input.haveSupportPeople,
          supportPeople: input.supportPeople,

          doesPsychologicalFollowUp: input.doesPsychologicalFollowUp,
          doesPsychiatricFollowUp: input.doesPsychiatricFollowUp,

          isUseMedication: input.isUseMedication,
          wouldSeekHelp: input.wouldSeekHelp,

          observation: input.observation,

          guidance: input.guidance,
          whatCanWeOffer: input.whatCanWeOffer,
        },
      });
    }),

  medicalAnamnesis: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        bloodType: z.optional(z.string()),
        priorIllness: z.optional(z.string()),
        previousHospitalizations: z.optional(z.string()),
        reasonForPreviousHospitalizations: z.optional(z.string()),
        previousSurgeries: z.optional(z.string()),
        injuries: z.optional(z.string()),
        allergies: z.optional(z.string()),
        allergy: z.optional(z.string()),
        familyDiseases: z.optional(z.string()),
        physicalActivity: z.optional(z.string()),
        smoking: z.optional(z.string()),
        smokingOf: z.optional(z.string()),
        etilismo: z.optional(z.string()),
        vaccineScheduleUpdate: z.optional(z.string()),
        typeOfHouse: z.optional(z.string()),
        reasonForPreviousSurgeries: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.medicalAnamnesis.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,

          bloodType: input.bloodType,
          priorIllness: input.priorIllness,
          previousHospitalizations: input.previousHospitalizations,
          reasonForPreviousHospitalizations:
            input.reasonForPreviousHospitalizations,
          previousSurgeries: input.previousSurgeries,
          reasonForPreviousSurgeries: input.reasonForPreviousSurgeries,
          injuries: input.injuries,
          allergies: input.allergies,
          allergy: input.allergy,
          familyDiseases: input.familyDiseases,
          physicalActivity: input.physicalActivity,
          smoking: input.smoking,
          smokersOf: input.smokingOf,
          etilismo: input.etilismo,
          vaccineScheduleUpdate: input.vaccineScheduleUpdate,
          typeOfHouse: input.typeOfHouse,
        },
        update: {
          bloodType: input.bloodType,
          priorIllness: input.priorIllness,
          previousHospitalizations: input.previousHospitalizations,
          reasonForPreviousHospitalizations:
            input.reasonForPreviousHospitalizations,
          previousSurgeries: input.previousSurgeries,
          injuries: input.injuries,
          allergies: input.allergies,
          allergy: input.allergy,
          familyDiseases: input.familyDiseases,
          physicalActivity: input.physicalActivity,
          smoking: input.smoking,
          smokersOf: input.smokingOf,
          etilismo: input.etilismo,
          vaccineScheduleUpdate: input.vaccineScheduleUpdate,
          typeOfHouse: input.typeOfHouse,
        },
      });
    }),

  dentalAnamnesis: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        complaint: z.optional(z.string()),
        isToothache: z.optional(z.string()),
        isGumPain: z.optional(z.string()),
        isGumsBleedWhenBrushing: z.optional(z.string()),
        isUseToothpaste: z.optional(z.string()),
        isUseDentalFloss: z.optional(z.string()),
        brushingFrequency: z.optional(z.string()),
        brushType: z.optional(z.string()),
        brushChange: z.optional(z.string()),
        isUsePacifier: z.optional(z.string()),
        eatingHabits: z.optional(z.string()),
        isAllergic: z.optional(z.string()),
        allergy: z.optional(z.string()),
        dentalTreatmentStatus: z.optional(z.string()),
        dentalTreatment: z.optional(z.string()),
        gum: z.optional(z.string()),
        gumObs: z.optional(z.string()),
        jugalMucosa: z.optional(z.string()),
        jugalObs: z.optional(z.string()),
        palate: z.optional(z.string()),
        palateObs: z.optional(z.string()),
        floor: z.optional(z.string()),
        floorObs: z.optional(z.string()),
        tongue: z.optional(z.string()),
        tongueObs: z.optional(z.string()),
        fluorosis: z.optional(z.string()),
        fluorosisObs: z.optional(z.string()),
        teeth: z.optional(z.any()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.dentalAnamnesis.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,

          complaint: input.complaint,
          isToothache: input.isToothache,
          isGumPain: input.isGumPain,
          isGumsBleedWhenBrushing: input.isGumsBleedWhenBrushing,
          isUseToothpaste: input.isUseToothpaste,
          isUseDentalFloss: input.isUseDentalFloss,
          brushingFrequency: input.brushingFrequency,
          brushType: input.brushType,
          brushChange: input.brushChange,
          isUsePacifier: input.isUsePacifier,
          eatingHabits: input.eatingHabits,
          isAllergic: input.isAllergic,
          allergy: input.allergy,
          dentalTreatmentStatus: input.dentalTreatmentStatus,
          dentalTreatment: input.dentalTreatment,

          gum: input.gum,
          gumObs: input.gumObs,
          jugalMucosa: input.jugalMucosa,
          jugalObs: input.jugalObs,
          palate: input.palate,
          palateObs: input.palateObs,
          floor: input.floor,
          floorObs: input.floorObs,
          tongue: input.tongue,
          tongueObs: input.tongueObs,
          fluorosis: input.fluorosis,
          fluorosisObs: input.fluorosisObs,
          teeth: input.teeth,
        },
        update: {
          complaint: input.complaint,
          isToothache: input.isToothache,
          isGumPain: input.isGumPain,
          isGumsBleedWhenBrushing: input.isGumsBleedWhenBrushing,
          isUseToothpaste: input.isUseToothpaste,
          isUseDentalFloss: input.isUseDentalFloss,
          brushingFrequency: input.brushingFrequency,
          brushType: input.brushType,
          brushChange: input.brushChange,
          isUsePacifier: input.isUsePacifier,
          eatingHabits: input.eatingHabits,
          isAllergic: input.isAllergic,
          allergy: input.allergy,
          dentalTreatmentStatus: input.dentalTreatmentStatus,
          dentalTreatment: input.dentalTreatment,

          gum: input.gum,
          gumObs: input.gumObs,
          jugalMucosa: input.jugalMucosa,
          jugalObs: input.jugalObs,
          palate: input.palate,
          palateObs: input.palateObs,
          floor: input.floor,
          floorObs: input.floorObs,
          tongue: input.tongue,
          tongueObs: input.tongueObs,
          fluorosis: input.fluorosis,
          fluorosisObs: input.fluorosisObs,
          teeth: input.teeth,
        },
      });
    }),

  physiotherapyAnamnesis: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        userId: z.string(),
        complaintMain: z.optional(z.string()),
        complaintSecondary: z.optional(z.string()),
        hda: z.optional(z.string()),
        medicinesUse: z.optional(z.string()),
        personalBackground: z.optional(z.string()),
        painAssessment: z.optional(z.string()),
        painAssessmentIntensity: z.optional(z.string()),
        painLocation: z.optional(z.string()),
        painIntensity: z.optional(z.string()),
        painFrequency: z.optional(z.string()),
        painFeature: z.optional(z.string()),
        specificInspection: z.optional(z.string()),
        specificInspectionObs: z.optional(z.string()),
        weight: z.optional(z.string()),
        height: z.optional(z.string()),
        pa: z.optional(z.string()),
        fc: z.optional(z.string()),
        fr: z.optional(z.string()),
        ap: z.optional(z.string()),

        posturalEvaluation: z.optional(z.string()),
        posturalEvaluationObs: z.optional(z.string()),

        thinFeel: z.optional(z.string()),
        fineStop: z.optional(z.string()),
        movementRestriction: z.optional(z.string()),
        perception: z.optional(z.string()),

        // 12
        jointMovement1: z.optional(z.string()),
        preserved1E: z.optional(z.string()),
        preserved1D: z.optional(z.string()),
        diminished1E: z.optional(z.string()),
        diminished1D: z.optional(z.string()),

        jointMovement2: z.optional(z.string()),
        preserved2E: z.optional(z.string()),
        preserved2D: z.optional(z.string()),
        diminished2E: z.optional(z.string()),
        diminished2D: z.optional(z.string()),

        jointMovement3: z.optional(z.string()),
        preserved3E: z.optional(z.string()),
        preserved3D: z.optional(z.string()),
        diminished3E: z.optional(z.string()),
        diminished3D: z.optional(z.string()),

        jointMovement4: z.optional(z.string()),
        preserved4E: z.optional(z.string()),
        preserved4D: z.optional(z.string()),
        diminished4E: z.optional(z.string()),
        diminished4D: z.optional(z.string()),

        jointMovement5: z.optional(z.string()),
        preserved5E: z.optional(z.string()),
        preserved5D: z.optional(z.string()),
        diminished5E: z.optional(z.string()),
        diminished5D: z.optional(z.string()),

        jointMovement6: z.optional(z.string()),
        preserved6E: z.optional(z.string()),
        preserved6D: z.optional(z.string()),
        diminished6E: z.optional(z.string()),
        diminished6D: z.optional(z.string()),

        jointMovement7: z.optional(z.string()),
        preserved7E: z.optional(z.string()),
        preserved7D: z.optional(z.string()),
        diminished7E: z.optional(z.string()),
        diminished7D: z.optional(z.string()),

        jointMovement8: z.optional(z.string()),
        preserved8E: z.optional(z.string()),
        preserved8D: z.optional(z.string()),
        diminished8E: z.optional(z.string()),
        diminished8D: z.optional(z.string()),

        jointMovement9: z.optional(z.string()),
        preserved9E: z.optional(z.string()),
        preserved9D: z.optional(z.string()),
        diminished9E: z.optional(z.string()),
        diminished9D: z.optional(z.string()),

        jointMovement10: z.optional(z.string()),
        preserved10E: z.optional(z.string()),
        preserved10D: z.optional(z.string()),
        diminished10E: z.optional(z.string()),
        diminished10D: z.optional(z.string()),

        jointMovement11: z.optional(z.string()),
        preserved11E: z.optional(z.string()),
        preserved11D: z.optional(z.string()),
        diminished11E: z.optional(z.string()),
        diminished11D: z.optional(z.string()),

        jointMovement12: z.optional(z.string()),
        preserved12E: z.optional(z.string()),
        preserved12D: z.optional(z.string()),
        diminished12E: z.optional(z.string()),
        diminished12D: z.optional(z.string()),

        memberTested1: z.optional(z.string()),
        degreeOfStrength1: z.optional(z.string()),
        memberTested2: z.optional(z.string()),
        degreeOfStrength2: z.optional(z.string()),
        memberTested3: z.optional(z.string()),
        degreeOfStrength3: z.optional(z.string()),
        memberTested4: z.optional(z.string()),
        degreeOfStrength4: z.optional(z.string()),
        memberTested5: z.optional(z.string()),
        degreeOfStrength5: z.optional(z.string()),

        generalObservation: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.physiotherapyAnamnesis.create({
        data: {
          ...input,
          userId: input.userId,
        },
      });
    }),

  atendimentoMedico: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        userId: z.string(),
        medico: z.optional(z.string()),
        data: z.optional(z.string()),
        peso: z.optional(z.string()),
        altura: z.optional(z.string()),
        imc: z.optional(z.string()),
        pressaoArterial: z.optional(z.string()),
        queixaPrincipal: z.optional(z.string()),
        evolucao: z.optional(z.string()),
        isda: z.optional(z.string()),
        exameFisico: z.optional(z.string()),
        geral: z.optional(z.string()),
        auscultaCardiaca: z.optional(z.string()),
        auscultaRespiratoria: z.optional(z.string()),
        abdominal: z.optional(z.string()),
        hipoteseDiagnostica: z.optional(z.string()),
        conduta: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.atendimentoMedico.create({
        data: {
          ...input,
          userId: input.userId,
        },
      });
    }),

  triagemNutricional: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        userId: z.string(),

        acessoPostoSaude: z.optional(z.string()),
        frequentaCentroSaude: z.optional(z.string()),
        estadoProprioSaude: z.optional(z.string()),
        fazParteGrupoCentroSaude: z.optional(z.string()),

        qualGrupoCentroSaude: z.optional(z.string()),

        deixoFazerAtividadePorMotivoSaude: z.optional(z.string()),
        quantosDiasDeixoDeFazerAtividade: z.optional(z.string()),

        principaisMotivosQueImpediu: z.optional(z.string()),
        principaisMotivosQueImpediuOutro: z.optional(z.string()),

        acamado: z.optional(z.string()),

        quandoEstaDoenteProcura: z.optional(z.string()),
        how: z.optional(z.string()),

        frequenciaComidaEnlatada: z.optional(z.string()),
        frequenciaLegume: z.optional(z.string()),
        // 1
        precupacaoFaltaAlimento: z.optional(z.string()),
        // 2
        faltaramAlimento: z.optional(z.string()),
        // 3
        faltaramAlimentoPorDinheiro: z.optional(z.string()),
        // 4
        apenasAlgunsAlimentosPorDinheiro: z.optional(z.string()),
        // 5
        adultoFaltouPorDinheiro: z.optional(z.string()),
        // 6
        adultoApenasAlgunsAlimentosPorDinheiro: z.optional(z.string()),
        // 7
        perguntaUm: z.optional(z.string()),
        // 8
        perguntaDois: z.optional(z.string()),
        // 9
        perguntaTres: z.optional(z.string()),
        // 10
        perguntaQuatro: z.optional(z.string()),
        // 11
        perguntaCinco: z.optional(z.string()),
        // 12
        perguntaSeis: z.optional(z.string()),
        // 13
        perguntaSete: z.optional(z.string()),
        // 14
        perguntaOito: z.optional(z.string()),

        idade: z.optional(z.string()),
        peso: z.optional(z.string()),
        alturo: z.optional(z.string()),
        imc: z.optional(z.string()),
        cq: z.optional(z.string()),
        cc: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.triagemNutricional.create({
        data: {
          ...input,
          userId: input.userId,
        },
      });
    }),

  entrepreneurship: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        familyincome: z.optional(z.string()),
        familyincomeOBS: z.optional(z.string()),
        paidActivity: z.optional(z.string()),
        paidActivityWhich: z.optional(z.string()),
        activityUsingRecyclableMaterials: z.optional(z.string()),
        activityUsingRecyclableMaterialsWhich: z.optional(z.string()),
        activityUsingRecyclableMaterialsWhere: z.optional(z.string()),
        craftsCuttingSewingCustomization: z.optional(z.string()),
        craftsCuttingSewingCustomizationWhich: z.optional(z.string()),
        investInSellingProduct: z.optional(z.string()),
        investInSellingProductWhich: z.optional(z.string()),
        cooperativeAssociation: z.optional(z.string()),
        cooperativeAssociationWhich: z.optional(z.string()),
        knowAboutEntrepreneurship: z.optional(z.string()),
        vaccineScheduleUpdate: z.optional(z.string()),
        desireToUndertake: z.optional(z.string()),
        desireToUndertakeWhich: z.optional(z.string()),
        opportunitiesToCreateYourOwnBusiness: z.optional(z.string()),
        profile: z.optional(z.string()),
        profileOther: z.optional(z.string()),
        interestInParticipating: z.optional(z.string()),
        interestInParticipatingWhich: z.optional(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entrepreneurship.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,

          familyincome: input.familyincome,
          familyincomeOBS: input.familyincomeOBS,
          paidActivity: input.paidActivity,
          paidActivityWhich: input.paidActivityWhich,
          activityUsingRecyclableMaterials:
            input.activityUsingRecyclableMaterials,
          activityUsingRecyclableMaterialsWhich:
            input.activityUsingRecyclableMaterialsWhich,
          activityUsingRecyclableMaterialsWhere:
            input.activityUsingRecyclableMaterialsWhere,
          craftsCuttingSewingCustomization:
            input.craftsCuttingSewingCustomization,
          craftsCuttingSewingCustomizationWhich:
            input.craftsCuttingSewingCustomizationWhich,
          investInSellingProduct: input.investInSellingProduct,
          investInSellingProductWhich: input.investInSellingProductWhich,
          cooperativeAssociation: input.cooperativeAssociation,
          cooperativeAssociationWhich: input.cooperativeAssociationWhich,
          knowAboutEntrepreneurship: input.knowAboutEntrepreneurship,
          desireToUndertake: input.desireToUndertake,
          desireToUndertakeWhich: input.desireToUndertakeWhich,
          opportunitiesToCreateYourOwnBusiness:
            input.opportunitiesToCreateYourOwnBusiness,
          profile: input.profile,
          profileOther: input.profileOther,
          interestInParticipating: input.interestInParticipating,
          interestInParticipatingWhich: input.interestInParticipatingWhich,
        },
        update: {
          familyincome: input.familyincome,
          familyincomeOBS: input.familyincomeOBS,
          paidActivity: input.paidActivity,
          paidActivityWhich: input.paidActivityWhich,
          activityUsingRecyclableMaterials:
            input.activityUsingRecyclableMaterials,
          activityUsingRecyclableMaterialsWhich:
            input.activityUsingRecyclableMaterialsWhich,
          activityUsingRecyclableMaterialsWhere:
            input.activityUsingRecyclableMaterialsWhere,
          craftsCuttingSewingCustomization:
            input.craftsCuttingSewingCustomization,
          craftsCuttingSewingCustomizationWhich:
            input.craftsCuttingSewingCustomizationWhich,
          investInSellingProduct: input.investInSellingProduct,
          investInSellingProductWhich: input.investInSellingProductWhich,
          cooperativeAssociation: input.cooperativeAssociation,
          cooperativeAssociationWhich: input.cooperativeAssociationWhich,
          knowAboutEntrepreneurship: input.knowAboutEntrepreneurship,
          desireToUndertake: input.desireToUndertake,
          desireToUndertakeWhich: input.desireToUndertakeWhich,
          opportunitiesToCreateYourOwnBusiness:
            input.opportunitiesToCreateYourOwnBusiness,
          profile: input.profile,
          profileOther: input.profileOther,
          interestInParticipating: input.interestInParticipating,
          interestInParticipatingWhich: input.interestInParticipatingWhich,
        },
      });
    }),

  // create: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //       cpf: z.optional(z.string()),
  //       rg: z.optional(z.string()),
  //       birthDate: z.date(),
  //       phone: z.optional(z.string()),
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.resident.create({
  //       data: {
  //         name: input.name,
  //         cpf: input.cpf ? input.cpf : undefined,
  //         rg: input.rg ? input.rg : undefined,
  //         birthDate: input.birthDate,
  //         phone: input.phone ? input.phone : undefined,
  //         createdBy: "tesst"
  //       },
  //     });
  //   }),

  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       name: z.optional(z.string()),
  //       cpf: z.optional(z.string()),
  //       rg: z.optional(z.string()),
  //       birthDate: z.optional(z.date()),
  //       phone: z.optional(z.string()),
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.resident.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         name: input.name ? input.name : undefined,
  //         cpf: input.cpf ? input.cpf : undefined,
  //         rg: input.rg ? input.rg : undefined,
  //         birthDate: input.birthDate ? input.birthDate : undefined,
  //         phone: input.phone ? input.phone : undefined,
  //       },
  //     });
  //   }),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.prisma.resident.delete({
  //     where: {
  //       id: input,
  //     },
  //   });
  // }),

  download: protectedProcedure.mutation(async ({ ctx }) => {
    const residents = await ctx.prisma.person.findMany();

    const wb = new Workbook();
    const ws = wb.addWorksheet("residentes");

    ws.columns = [
      { header: "Id", key: "id", width: 32 },
      { header: "Nome", key: "nome", width: 32 },
      { header: "Nome Social", key: "socialName", width: 32 },
      { header: "Data de Nascimento", key: "birthDate", width: 20 },
      { header: "Genero", key: "gender", width: 32 },
      { header: "Raca/Cor", key: "raceColor", width: 32 },
      { header: "Religião", key: "religion", width: 32 },
      { header: "Local de nascimento", key: "birthPlace", width: 32 },
      { header: "Cartao do Sus", key: "susCard", width: 32 },
      { header: "Telefone", key: "phone", width: 32 },
      { header: "Turma", key: "class", width: 32 },
      { header: "Se e Criança", key: "isChild", width: 32 },
      { header: "Profissão", key: "profession", width: 32 },
      { header: "Estado Civil", key: "maritalStatus", width: 32 },
      { header: "Vivem juntos", key: "liveTogether", width: 32 },
      { header: "Filhos", key: "children", width: 32 },
      { header: "Idades dos Filhos", key: "agesOfChildren", width: 32 },
      { header: "Escolaridade", key: "schooling", width: 32 },
      { header: "Plano de saude", key: "healthPlan", width: 32 },
      {
        header: "Condição do acesso ao tratamento de agua",
        key: "conditionsAcessTreatedWater",
        width: 32,
      },
      {
        header: "Acesso ao tratamento de agua",
        key: "accessToTreatedWater",
        width: 32,
      },
      {
        header: "Acesso ao tratamento de esgoto",
        key: "acessToSewage",
        width: 32,
      },
      { header: "Vive na comunidade", key: "isLiveInTheCommunity", width: 32 },
      {
        header: "Possui Certidão de Nascimento",
        key: "isHaveBirthCertificate",
        width: 32,
      },
      {
        header: "Certidão de Nascimento Observações",
        key: "BirthCertificateObs",
        width: 32,
      },
      { header: "Tem RG", key: "isHaveRg", width: 32 },
      { header: "Numero do RG", key: "rgNumber", width: 32 },
      { header: "Tem CPF", key: "isHaveCpf", width: 32 },
      { header: "Numero do CPF", key: "cpfNumber", width: 32 },
      { header: "Não tem CPF nem RG", key: "doesNotHaveCpfandRg", width: 32 },
      { header: "CPF e RG Observações", key: "dontHaveRgCpfObs", width: 32 },
      { header: "Qual via precisa", key: "whichWayIsNeeded", width: 32 },
      {
        header: "Tem Cartão do SUS - Crianças",
        key: "isHaveSusCard",
        width: 32,
      },
      {
        header: "Tem Cartão de vacinação - Crianças",
        key: "isHaveVaccinationCard",
        width: 32,
      },
      { header: "Tem Titulo de leitor", key: "isHaveElectedTitle", width: 32 },
      { header: "Tem Carteira de trabalho", key: "isHaveCTPS", width: 32 },
      { header: "Documento extraviado", key: "lostDocument", width: 32 },
      { header: "Documento pendentes", key: "pendingDocuments", width: 32 },
      { header: "Sentimentos", key: "feeling", width: 32 },
      {
        header: "Oportunidade de lazer",
        key: "opportunitiesLeisure",
        width: 32,
      },
      { header: "Qualidade de Sono", key: "sleepQuality", width: 32 },
      {
        header: "Faz atividade fisica",
        key: "isPerformsPhysicalActivity",
        width: 32,
      },
      {
        header: "Quais atividades fisicas",
        key: "physicalActivities",
        width: 32,
      },
      { header: "Autocuidado", key: "selfCare", width: 32 },
      { header: "Tipos de sentimentos", key: "typesOfThinking", width: 32 },
      { header: "Tem suporte de pessoas", key: "supportPeople", width: 32 },
      {
        header: "Tem acompanhamento de psicologia",
        key: "doesPsychologicalFollowUp",
        width: 32,
      },
      {
        header: "Tem acompanhamento de psiquiatro",
        key: "doesPsychiatricFollowUp",
        width: 32,
      },
      { header: "Usa medicamento", key: "isUseMedication", width: 32 },
      { header: "Tem pessoa de apoio", key: "wouldSeekHelp", width: 32 },
      { header: "Observação na pesquisa", key: "observation", width: 32 },
      {
        header: "Buscaria atendimentos psicologicos",
        key: "guidance",
        width: 32,
      },
      { header: "Oque podemos oferecer", key: "whatCanWeOffer", width: 32 },
    ];

    async function getInfos(userId: string) {
      const documents = await ctx.prisma.documentsEmission.findMany({
        where: {
          userId,
        },
      });

      const medical = await ctx.prisma.medicalAnamnesis.findMany({
        where: {
          userId,
        },
      });

      const psychological = await ctx.prisma.psychologicalAnamnesis.findMany({
        where: {
          userId,
        },
      });

      return {
        documents,
        medical,
        psychological,
      };
    }
    for (const resident of residents) {
      const infos = await getInfos(resident.id);
      // buscar os dados do residente de documentos de emissão
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument

      ws.addRow({
        nome: resident.name,
        socialName: resident.socialName ?? "Sem Nome Social",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
        birthDate:
          resident.birthDate!.toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          }) ?? "Sem Data de Nascimento",
        gender: resident.gender ?? "Sem Genero",
        raceColor: resident.raceColor ?? "Sem Raça/Cor",
        religion: resident.religion ?? "Sem Religião",
        birthPlace: resident.Birthplace ?? "Sem Local de Nascimento",
        susCard: resident.susCard ?? "Sem Cartão do SUS",
        phone: resident.phone ?? "Sem Telefone",
        class: resident.class ?? "Sem Turma",
        isChild: resident.isChild ? "Sim" : "Não",
        profession: resident.profession ?? "Sem Profissão",
        maritalStatus: resident.maritalStatus ?? "Sem Estado Civil",
        liveTogether: resident.liveTogether ?? "Sem Informação",
        children: resident.children ?? "Sem Informação",
        agesOfChildren: resident.agesOfChildren ?? "Sem Informação",
        schooling: resident.schooling ?? "Sem Informação",
        healthPlan: resident.healthPlan ?? "Sem Informação",
        conditionsAcessTreatedWater:
          resident.conditionsAccessTreatedWater ?? "Sem Informação",
        accessToTreatedWater: resident.accessToTreatedWater ?? "Sem Informação",
        acessToSewage: resident.accessToSewage ?? "Sem Informação",
        isLiveInTheCommunity:
          infos.documents[0]?.isLiveInTheCommunity ?? "Sem Informação",
        isHaveBirthCertificate:
          infos.documents[0]?.isHaveBirthCertificate ?? "Sem Informação",
        BirthCertificateObs:
          infos.documents[0]?.BirthCertificateObs ?? "Sem Informação",
        isHaveRg: infos.documents[0]?.isHaveRg ?? "Sem Informação",
        rgNumber: infos.documents[0]?.rgNumber ?? "Sem Informação",
        isHaveCpf: infos.documents[0]?.isHaveCpf ?? "Sem Informação",
        cpfNumber: infos.documents[0]?.cpfNumber ?? "Sem Informação",
        doesNotHaveCpfandRg:
          infos.documents[0]?.doesNotHaveCpfandRg ?? "Sem Informação",
        dontHaveRgCpfObs:
          infos.documents[0]?.dontHaveRgCpfObs ?? "Sem Informação",
        whichWayIsNeeded:
          infos.documents[0]?.whichWayIsNeeded ?? "Sem Informação",
        isHaveSusCard: infos.documents[0]?.isHaveSusCard ?? "Sem Informação",
        isHaveVaccinationCard:
          infos.documents[0]?.isHaveVaccinationCard ?? "Sem Informação",
        isHaveElectedTitle:
          infos.documents[0]?.isHaveElectedTitle ?? "Sem Informação",
        isHaveCTPS: infos.documents[0]?.isHaveCTPS ?? "Sem Informação",
        lostDocument: infos.documents[0]?.lostDocument ?? "Sem Informação",
        pendingDocuments:
          infos.documents[0]?.pendingDocuments ?? "Sem Informação",
        feeling: infos.psychological[0]?.feeling ?? "Sem Informação",
        opportunitiesLeisure:
          infos.psychological[0]?.opportunitiesLeisure ?? "Sem Informação",
        sleepQuality: infos.psychological[0]?.sleepQuality ?? "Sem Informação",
        isPerformsPhysicalActivity:
          infos.psychological[0]?.isPerformsPhysicalActivity ??
          "Sem Informação",
        physicalActivities:
          infos.psychological[0]?.physicalActivities ?? "Sem Informação",
        selfCare: infos.psychological[0]?.selfCare ?? "Sem Informação",
        typesOfThinking:
          infos.psychological[0]?.typesOfThinking ?? "Sem Informação",
        supportPeople:
          infos.psychological[0]?.supportPeople ?? "Sem Informação",
        doesPsychologicalFollowUp:
          infos.psychological[0]?.doesPsychologicalFollowUp ?? "Sem Informação",
        doesPsychiatricFollowUp:
          infos.psychological[0]?.doesPsychiatricFollowUp ?? "Sem Informação",
        isUseMedication:
          infos.psychological[0]?.isUseMedication ?? "Sem Informação",
        wouldSeekHelp:
          infos.psychological[0]?.wouldSeekHelp ?? "Sem Informação",
        observation: infos.psychological[0]?.observation ?? "Sem Informação",
        guidance: infos.psychological[0]?.guidance ?? "Sem Informação",
        whatCanWeOffer:
          infos.psychological[0]?.whatCanWeOffer ?? "Sem Informação",

        // secrianca: resident.isChild ? "Sim" : "Não",
        // birthDate: resident.birthDate!.toLocaleDateString('pt-BR', {timeZone: 'UTC'}) ?? "Sem Data de Nascimento",
        // phone: resident.phone ?? "Sem Telefone",
      });
    }

    const filename = "dadosGerais.xlsx";
    const filePath = join(process.cwd(), filename);

    const stream = createWriteStream(filePath);

    await wb.xlsx.writeFile(filePath);
    await wb.xlsx.write(stream);
    // await wb.csv.writeFile(filePath);
    // await wb.csv.write(stream);

    const downloadUrl = `/api/download/${filename}`;
    return { downloadUrl };
  }),
});
