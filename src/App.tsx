import { useEffect } from "react";
import "./App.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { Dimension } from "./types/types";
import useAppStore from "./data/store";

function App() {
  const {
    dimensions,
    getDimensions,
    countries,
    selectedDimensionId,
    selectDimension,
  } = useAppStore();

  // get all dimensions at landing
  useEffect(() => {
    getDimensions();
  }, []);

  console.log();

  return (
    <>
      <h1>WELCOME TO YOUR DASHBOARD</h1>
      <div className="selectorBox">
        {countries.map((country) => (
          <div className="countryBox">
            <div className="country">{country}</div>
            {dimensions
              .filter((dim: Dimension) => dim.country === country)
              .map((dim: Dimension) => (
                <div
                  className={`dimensionSelector ${
                    selectedDimensionId === dim.id && "selected"
                  }`}
                  onClick={() => {
                    selectDimension(dim.id);
                    console.log(dim.id, typeof dim.id);
                  }}
                >
                  <div>{dim.business_unit}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="indicatorsContainer">
        <div>
          <div className="indicatorContainer">
            Indicator 1
            <BarChart
              series={[{ data: [35, 44, 24, 34] }]}
              height={200}
              xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
          <div className="indicatorContainer">Indicator 2</div>
        </div>
        <div>
          <div className="indicatorContainer">Indicator 3</div>
          <div className="indicatorContainer">Indicator 4</div>
        </div>
      </div>
    </>
  );
}

export default App;
