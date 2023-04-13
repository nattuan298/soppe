import { useEffect, useMemo, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ShadowOptionsObject } from "highcharts";
import { useTranslation } from "react-i18next";
import hightChartOptions from "./hightChartOption";

import "./styles.css";

const boxShadow = {
  offsetX: 0,
  offsetY: 3,
  width: 6,
  color: "#00000029",
} as ShadowOptionsObject;

const labelAxisStyle = {
  color: "#BCBCBC",
  fontFamily: "Helvetica",
  fontSize: "18px",
  fontWeight: "500",
};

interface LineChartProps {
  data: Array<Array<number>>;
  height: number;
  name: string;
}

const baseShortMonths = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const baseMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const baseWeekend = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function ChartSales({ data, height, name }: LineChartProps) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (chartComponentRef.current) {
      // chartComponentRef.current.chart.chartWidth = containerRef.current.offsetWidth - 10;
      chartComponentRef.current.chart.redraw();
    }
  }, [containerRef, chartComponentRef, t]);

  const options = useMemo(
    () => ({
      chart: {
        type: "spline",
        height,
      },
      title: {
        text: "",
      },
      xAxis: {
        labels: {
          style: labelAxisStyle,
        },
        type: "datetime",
        dateTimeLabelFormats: {
          // day: "%b",
          month: "%b",
        },
        // units: [["day", [7, 25]]],
        // showFirstLabel: true,
        // startOnTick: true,
        // endOnTick: false,
      },
      yAxis: {
        title: {
          text: "",
        },
        labels: {
          style: labelAxisStyle,
        },
      },
      series: [
        {
          name,
          lineWidth: 5,
          color: "#FF7500",
          data,
        },
      ],
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: { marker: { enabled: false }, shadow: boxShadow },
      },
      credits: { enabled: false },
    }),
    [height, data, name],
  ) as Highcharts.Options;

  const shortMonths = useMemo(() => baseShortMonths.map((item) => t(item as "sign-in")), [t]);
  const months = useMemo(() => baseMonths.map((item) => t(item as "sign-in")), [t]);
  const weekdays = useMemo(() => baseWeekend.map((item) => t(item as "sign-in")), [t]);

  const hightCharts = useMemo(
    () => hightChartOptions(Highcharts, months, weekdays, shortMonths),
    [shortMonths, months],
  );

  return (
    <div ref={containerRef} className="w-full mt-0.5 lineChart">
      <HighchartsReact highcharts={hightCharts} options={options} ref={chartComponentRef} />
    </div>
  );
}
