import { BarChart } from "@mui/x-charts/BarChart";
import { IndicatorData } from "../types/types";

interface GraphProps {
  data: IndicatorData[] | undefined;
  title: string;
}

const Graph: React.FC<GraphProps> = ({ data, title }) => {
  return (
    <div className="indicatorContainer">
      {title}
      {data && (
        <BarChart
          series={[{ data: data?.map((d: any) => d.value) }]}
          height={200}
          xAxis={[
            {
              data: data?.map((d: any) => d.timeUnit),
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      )}
    </div>
  );
};

export default Graph;
