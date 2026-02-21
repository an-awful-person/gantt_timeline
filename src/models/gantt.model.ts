import type { ChartDataset, Color } from "chart.js";

export type GanttChartData = BarChartData; //I am using a bar chart as a gantt chart. So the data structure is the same.

export type BarChartData = {
    labels?:unknown[];
    datasets:GanttChartDataset[],
    borderColor?:Color;
    backgroundColor?:Color;
    borderWidth?:number;
    borderRadius?:number;
    borderSkipped?:boolean;
}

export type GanttChartDataset = ChartDataset<"bar", (number | [number, number] | null)[]> & {
    customData?: Map<string,any>;
}