import { IndicatorsData } from "../types/types";
import { IND_CO2, IND_MAL, IND_FEM, IND_TOT } from "../config";

// NOTE : Regroup by by year is missing yet. This is where we will have to regroup data by year.

export const dataTransformByMonth = (data: any): IndicatorsData => {
  // Here let's first regroupe Male and Females to calculate sums and ratio :
  // Note : this calculation is not optimized AND SECURED and it supposes that any female record matches a defined male count
  // But we will preferably ask back end to send a count, or a different data model with male and females regrouped under one date

  const malesGroup = data.results.filter((d: any) => d.indicator === IND_MAL);

  const headsRegroup = data.results
    .filter((d: any) => d.indicator === IND_FEM)
    .map((fem: any) => {
      const maleCountForThisDate = malesGroup.find(
        (mal: any) => mal.date === fem.date
      ).value;
      return {
        timeUnit: fem.date,
        femalesCount: fem.value,
        menCount: maleCountForThisDate,
      };
    });

  return {
    co2Emissions: data.results
      .filter((d: any) => d.indicator === IND_CO2)
      .map((d: any) => {
        return { timeUnit: d.date, value: d.value };
      }),
    totalRevenue: data.results
      .filter((d: any) => d.indicator === IND_TOT)
      .map((d: any) => {
        return { timeUnit: d.date, value: d.value };
      }),
    headcount: headsRegroup.map((d: any) => {
      return { timeUnit: d.timeUnit, value: d.femalesCount + d.menCount };
    }),
    genderRatio: headsRegroup.map((d: any) => {
      return {
        timeUnit: d.timeUnit,
        value: (d.femalesCount * 100) / (d.femalesCount + d.menCount),
      };
    }),
  };
};
