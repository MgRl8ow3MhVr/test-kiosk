import { useEffect } from "react";
import "./App.css";
import { Dimension } from "./types/types";
import useAppStore from "./data/store";
import Graph from "./components/Graph";
import { IND_NAMES } from "./config";

function App() {
  const {
    dimensions,
    getDimensions,
    countries,
    selectedDimensionId,
    selectDimension,
    indicatorsData,
  } = useAppStore();

  // get all dimensions at landing
  useEffect(() => {
    getDimensions();
  }, []);

  return (
    <>
      <h1>WELCOME TO YOUR DASHBOARD</h1>
      <div className="selectorBox">
        {countries.map((country, i) => (
          <div className="countryBox" key={i}>
            <div className="country">{country}</div>
            {dimensions
              .filter((dim: Dimension) => dim.country === country)
              .map((dim: Dimension, j) => (
                <div
                  key={j}
                  className={`dimensionSelector ${
                    selectedDimensionId === dim.id && "selected"
                  }`}
                  onClick={() => {
                    selectDimension(dim.id);
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
          <Graph
            data={indicatorsData.co2Emissions}
            title={IND_NAMES.co2Emissions}
          />
          <Graph
            data={indicatorsData.totalRevenue}
            title={IND_NAMES.totalRevenue}
          />
        </div>
        <div>
          <Graph data={indicatorsData.headcount} title={IND_NAMES.headcount} />{" "}
          <Graph
            data={indicatorsData.genderRatio}
            title={IND_NAMES.genderRatio}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default App;
