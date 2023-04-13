import { useEffect, useMemo, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./styles.css";

interface PieItem {
  name: string;
  y: number;
  color: string;
}

interface PieChartProps {
  data: Array<PieItem>;
  height: number;
}

export default function PieDonutChart({ data, height }: PieChartProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => ({
      chart: {
        type: "pie",
        height,
      },
      title: {
        text: "",
      },
      series: [
        {
          data,
          innerSize: "70%",
          size: "100%",
        },
      ],
      legend: {
        enabled: false,
      },
      credits: { enabled: false },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
        },
      },
    }),
    [height, data],
  ) as Highcharts.Options;

  useEffect(() => {
    if (chartComponentRef.current && containerRef.current) {
      chartComponentRef.current.chart.chartWidth = containerRef.current.offsetWidth - 50;
    }
  }, [containerRef, chartComponentRef]);

  return (
    <div ref={containerRef} className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
    </div>
  );
}
