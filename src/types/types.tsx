export interface Dimension {
  id: string;
  country: string;
  business_unit: string;
}
export interface Indicator {
  date: string;
  dimension: string;
  indicator: string;
  value: number;
}

export interface IndicatorData {
  timeUnit: string;
  value: number;
}

export interface IndicatorsData {
  co2Emissions?: IndicatorData[];
  totalRevenue?: IndicatorData[];
  headcount?: IndicatorData[];
  genderRatio?: IndicatorData[];
}
