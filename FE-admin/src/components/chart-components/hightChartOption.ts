export default function hightChartOptions(
  hightChart: any,
  months: any,
  weekdays: any,
  shortMonths: any,
) {
  hightChart.setOptions({
    lang: {
      months,
      weekdays,
      shortMonths,
    },
  });
  return hightChart;
}
