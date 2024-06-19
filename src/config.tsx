export const APIURL: string =
  import.meta.env.VITE__APP_API_URL || "http://localhost:8080";
export const ALLINDICATORS: string =
  "indicators=co2_emissions&indicators=total_revenue&indicators=female_headcount&indicators=male_headcount";

export const IND_CO2: string = "co2_emissions";
export const IND_FEM: string = "female_headcount";
export const IND_MAL: string = "male_headcount";
export const IND_TOT: string = "total_revenue";

export const IND_NAMES = {
  co2Emissions: "Emissions de Co2",
  totalRevenue: "Revenu Total",
  headcount: "Nombre d'employés",
  genderRatio: "Ratio de parité",
};
