import create from "zustand";
import { Dimension, Indicator } from "../types/types";
import { APIURL, ALLINDICATORS } from "../config";

interface StoreState {
  loading: boolean;
  error: string | null;
  dimensions: Dimension[];
  countries: string[];
  selectedDimensionId: string;
  indicatorData: Indicator[];
  fetchApi: (
    suffix: string,
    successFunction: (data: any) => void
  ) => Promise<void>;
  getDimensions: () => void;
  selectDimension: (id: string) => void;
}

const useAppStore = create<StoreState>((set, get) => ({
  loading: false,
  error: null,
  dimensions: [],
  selectedDimensionId: "",
  countries: [],
  indicatorData: [],
  fetchApi: async (suffix: string, successFunction: (data: any) => void) => {
    // Only get methods. Update function with method if more methods
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${APIURL}/${suffix}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ loading: false });
      successFunction(data);
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getDimensions: () =>
    get().fetchApi("dimensions", (data) => {
      set({
        dimensions: data?.results || [],
        // get list of unique
        countries: data?.results
          .map((dim: Dimension) => dim.country)
          .filter((item: string, pos: number) => {
            return (
              data?.results
                .map((dim: Dimension) => dim.country)
                .indexOf(item) == pos
            );
          }),
      });
    }),

  selectDimension: (id: string) => {
    set({ selectedDimensionId: id });
    console.log("id", id);
    // http://localhost:8080/indicators?start=2020-01-01&end=2024-01-01&dimensions=1&

    get().fetchApi(
      `indicators?start=2020-01-01&end=2024-01-01&dimensions=${id}&${ALLINDICATORS}`,
      (data) => {
        console.log("DATA RECEIVED", data);
        // set({
        //   indicatorData: data?.results || [],
        // }),
      }
    );
  },
}));

export default useAppStore;
